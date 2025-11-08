from sqlmodel import Field, Relationship
from .base_model import TimestampedBaseModel
from typing import Optional, TYPE_CHECKING, ClassVar
from sqlmodel import SQLModel, select
from sqlalchemy import func
from sqlalchemy.ext.hybrid import hybrid_property
from .tournament_model import Tournament

if TYPE_CHECKING:
    from . import Question


class Prompt(TimestampedBaseModel, table=True):
    question_id: int = Field(foreign_key="question.id")
    prompt_text: str

    question: Optional["Question"] = Relationship(back_populates="prompts")
    tournaments: list["Tournament"] = Relationship()
    winning_tournaments: list["Tournament"] = Relationship(
        back_populates="winning_prompt"
    )

    win_count: ClassVar[hybrid_property]

    @hybrid_property
    def win_count(self):
        return len(self.winning_tournaments or [])

    @win_count.expression
    def win_count(cls):
        return (
            select(func.count(Tournament.id))
            .where(Tournament.winning_prompt_id == cls.id)
            .correlate(cls)
            .scalar_subquery()
        )


class PromptRead(SQLModel):
    id: int
    prompt_text: str
    win_count: int = 0

    class Config:
        orm_mode = True
