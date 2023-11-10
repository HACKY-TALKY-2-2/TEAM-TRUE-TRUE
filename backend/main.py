from fastapi import FastAPI, Request
from dotenv import load_dotenv
from utils import getPRs, getCommits
from model import PR, Commit, client
from typing import List, Dict, Union, Optional
from contextlib import asynccontextmanager
import os


load_dotenv()

@asynccontextmanager
async def initMongo(app: FastAPI):
    client.connect()
    yield
    client.close()

app = FastAPI(lifespan=initMongo)


@app.get("/pull/{owner}/{repo}", response_model=List[PR])
async def getpull(owner: str = ..., repo: str = ...):
    return getPRs(owner, repo)

@app.get("/commit/{owner}/{repo}/{pr_number}", response_model=List[Commit])
async def getcommit(owner: str = ..., repo: str = ..., pr_number: int = ...):
    return getCommits(owner, repo, pr_number)