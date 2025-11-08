from sqlmodel import Relationship
from .base_model import TimestampedBaseModel
from typing import List, TYPE_CHECKING
from .prompt_model import PromptRead
from sqlmodel import SQLModel

if TYPE_CHECKING:
    from . import Tournament, Prompt


class Question(TimestampedBaseModel, table=True):
    question_text: str

    prompts: List["Prompt"] = Relationship(back_populates="question")
    tournaments: List["Tournament"] = Relationship(back_populates="question")


class QuestionRead(SQLModel):
    id: int
    question_text: str
    prompts: List[PromptRead] = []


class QuestionReadWithVote(QuestionRead):
    is_voted: bool = False
    voted_prompt_id: int | None = None
