from sqlmodel import Session, select
from models import Question, Prompt
from core.db import engine


def seed_data():
    with Session(engine) as session:
        existing = session.exec(select(Question)).first()
        if existing:
            print("Database already seeded.")
            return

        questions = [
            {
                "question_text": "Explain the importance of prompt engineering in LLMs.",
                "prompts": [
                    "Explain what prompt engineering is and why it matters in LLMs.",
                    "How does prompt phrasing impact the quality of LLM responses?",
                    "Give an example where a small change in prompt wording changes output quality.",
                    "Describe how prompt engineering helps control bias or tone in LLM outputs.",
                ],
            },
            {
                "question_text": "What are the main differences between supervised and unsupervised learning?",
                "prompts": [
                    "Explain supervised vs unsupervised learning in simple terms.",
                    "List three differences between supervised and unsupervised learning.",
                    "Give real-world examples of both supervised and unsupervised learning.",
                    "Describe a situation where unsupervised learning is preferred.",
                ],
            },
            {
                "question_text": "Describe how transformers changed NLP.",
                "prompts": [
                    "Explain how transformers improved NLP compared to RNNs and LSTMs.",
                    "What role does the attention mechanism play in transformers?",
                    "Summarize the key innovations introduced by the Transformer paper (2017).",
                    "Explain why transformers enable parallel training and why that’s important.",
                ],
            },
        ]

        for q in questions:
            question = Question(
                question_text=q["question_text"],
                prompts=[Prompt(prompt_text=p) for p in q["prompts"]],
            )
            session.add(question)

        session.commit()
        print("Database seeded successfully.")
