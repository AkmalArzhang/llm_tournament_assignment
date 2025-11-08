from sqlmodel import Field, Relationship
from .base_model import TimestampedBaseModel
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from . import User, Question, Prompt


class Tournament(TimestampedBaseModel, table=True):
    user_id: int = Field(foreign_key="user.id")
    question_id: int = Field(foreign_key="question.id")
    winning_prompt_id: int = Field(foreign_key="prompt.id")

    user: Optional["User"] = Relationship(back_populates="tournaments")
    question: Optional["Question"] = Relationship(back_populates="tournaments")
    winning_prompt: Optional["Prompt"] = Relationship(
        back_populates="winning_tournaments"
    )
