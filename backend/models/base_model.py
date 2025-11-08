from typing import Optional
from sqlmodel import SQLModel, Field
from core.mixins import TimestampMixin


class BaseModel(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True, index=True)


class TimestampedBaseModel(BaseModel, TimestampMixin):
    pass
