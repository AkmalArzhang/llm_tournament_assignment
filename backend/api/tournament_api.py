from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from models import Tournament, Question, Prompt
from core.security import get_current_user
from core.db import get_session
from typing import List

router = APIRouter(
    prefix="/tournaments",
    tags=["Tournaments"],
    dependencies=[Depends(get_current_user)],
)


@router.post("/", response_model=Tournament)
def create_tournament(
    question_id: int,
    winning_prompt_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user),
):
    is_already_exists = (
        session.exec(
            select(Tournament)
            .where(Tournament.question_id == question_id)
            .where(Tournament.user_id == current_user.id)
            .where(Tournament.winning_prompt_id == winning_prompt_id)
        ).first()
        is not None
    )

    if is_already_exists:
        raise HTTPException(status_code=400, detail="Tournament already played")

    question = session.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    prompt = session.get(Prompt, winning_prompt_id)
    if not prompt or prompt.question_id != question_id:
        raise HTTPException(status_code=400, detail="Invalid prompt for this question")

    tournament = Tournament(
        user_id=current_user.id,
        question_id=question_id,
        winning_prompt_id=winning_prompt_id,
    )

    session.add(tournament)
    session.commit()
    session.refresh(tournament)
    return tournament
