from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy import event
from models import *
from .config import settings
from datetime import datetime, timezone

engine = create_engine(settings.DATABASE_URL, echo=settings.DEBUG)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


@event.listens_for(Session, "before_flush")
def receive_before_flush(session, flush_context, instances):
    for obj in session.new:
        if hasattr(obj, "created_at"):
            setattr(obj, "created_at", datetime.now(timezone.utc))
        if hasattr(obj, "updated_at"):
            setattr(obj, "updated_at", datetime.now(timezone.utc))

    for obj in session.dirty:
        if hasattr(obj, "updated_at"):
            setattr(obj, "updated_at", datetime.now(timezone.utc))
