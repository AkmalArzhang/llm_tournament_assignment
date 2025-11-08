from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from models.user_model import User, UserCreate, TokenResponse
from core.db import get_session
from core.security import hash_password, verify_password, create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/signup")
def register_user(
    user: UserCreate, session: Session = Depends(get_session)
) -> TokenResponse:
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
    return {
        "access_token": token,
        "token_type": "bearer",
        "username": new_user.username,
    }


@router.post("/login")
def login_user(
    user: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)
) -> TokenResponse:
    db_user = session.exec(
        select(User).where(User.username == user.username.strip().lower())
    ).first()

    if not db_user or not verify_password(user.password.strip(), db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials.")

    token = create_access_token(data={"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer", "username": db_user.username}
