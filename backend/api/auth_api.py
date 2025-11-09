from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from models.user_model import User, UserCreate, AuthResponse
from core.db import get_session
from core.security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)
from core.config import settings

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/signup")
def register_user(
    user: UserCreate, response: Response, session: Session = Depends(get_session)
) -> AuthResponse:
    existing_user = session.exec(
        select(User).where(User.username == user.username.lower())
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists.")

    hashed = hash_password(user.password)
    new_user = User(username=user.username.lower(), password=hashed)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    token = create_access_token(data={"sub": new_user.username})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return {"username": new_user.username, "message": "Registration successful"}


@router.post("/login")
def login_user(
    user: OAuth2PasswordRequestForm = Depends(),
    response: Response = None,
    session: Session = Depends(get_session),
) -> AuthResponse:
    db_user = session.exec(
        select(User).where(User.username == user.username.strip().lower())
    ).first()

    if not db_user or not verify_password(user.password.strip(), db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials.")

    token = create_access_token(data={"sub": db_user.username})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return {"username": db_user.username, "message": "Login successful"}


@router.post("/logout")
def logout_user(response: Response, current_user: User = Depends(get_current_user)):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
    )
    return {"message": "Successfully logged out"}
