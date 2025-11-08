from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from core.db import init_db
from api import questions_api, auth_api, tournament_api
from core.config import settings
from core.seeder import seed_data


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    seed_data()
    yield


app = FastAPI(lifespan=lifespan, debug=settings.DEBUG)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {"message": "Welcome to the LLM Tournament API!"}


app.include_router(auth_api.router)
app.include_router(questions_api.router)
app.include_router(tournament_api.router)
