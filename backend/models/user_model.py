from .base_model import TimestampedBaseModel
from typing import TYPE_CHECKING
from sqlmodel import Relationship, SQLModel, Field
from pydantic import BaseModel, field_validator
import re

if TYPE_CHECKING:
    from . import Tournament


class User(TimestampedBaseModel, table=True):
    username: str = Field(unique=True, index=True, max_length=50)
    password: str

    tournaments: list["Tournament"] = Relationship(back_populates="user")


class UserCreate(SQLModel):
    username: str
    password: str

    @field_validator("username")
    @classmethod
    def validate_username(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Username cannot be empty or only whitespace")
        if len(v) < 3:
            raise ValueError("Username must be at least 3 characters long")
        if len(v) > 50:
            raise ValueError("Username must be at most 50 characters long")
        if not re.match(r"^[a-zA-Z0-9_-]+$", v):
            raise ValueError(
                "Username can only contain letters, numbers, hyphens, and underscores"
            )
        return v.lower()

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Password cannot be empty or only whitespace")
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r"[A-Za-z]", v):
            raise ValueError("Password must contain at least one letter")
        if not re.search(r"[0-9]", v):
            raise ValueError("Password must contain at least one number")
        return v


class AuthResponse(BaseModel):
    username: str
    message: str = "Authentication successful"
