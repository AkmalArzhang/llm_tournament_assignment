from fastapi import APIRouter, Depends, HTTPException
from models import Question, QuestionRead, QuestionReadWithVote, Tournament, PromptRead
from core.security import get_current_user
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from core.db import get_session

router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/", response_model=list[QuestionRead])
def list_questions(
    session: Session = Depends(get_session), current_user=Depends(get_current_user)
):
    questions = session.exec(
        select(Question).options(selectinload(Question.prompts))
    ).all()
    return questions


@router.get("/{question_id}", response_model=QuestionReadWithVote)
def get_question(
    question_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user),
):
    question = session.exec(
        select(Question)
        .where(Question.id == question_id)
        .options(selectinload(Question.prompts))
    ).first()

    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    user_tournament = session.exec(
        select(Tournament)
        .where(Tournament.question_id == question_id)
        .where(Tournament.user_id == current_user.id)
    ).first()

    is_voted = user_tournament is not None
    voted_prompt_id = user_tournament.winning_prompt_id if user_tournament else None

    return QuestionReadWithVote(
        id=question.id,
        question_text=question.question_text,
        is_voted=is_voted,
        voted_prompt_id=voted_prompt_id,
        prompts=[
            PromptRead(
                id=p.id,
                prompt_text=p.prompt_text,
                win_count=len(p.winning_tournaments),
            )
            for p in question.prompts
        ],
    )
