from .base_model import TimestampedBaseModel
from typing import TYPE_CHECKING
from sqlmodel import Relationship, SQLModel
from pydantic import BaseModel

if TYPE_CHECKING:
    from . import Tournament


class User(TimestampedBaseModel, table=True):
    username: str
    password: str

    tournaments: list["Tournament"] = Relationship(back_populates="user")


class UserCreate(SQLModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
