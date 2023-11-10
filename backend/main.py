from fastapi import FastAPI
from dotenv import load_dotenv
from utils import getPRs, getCommits
from model import PR, Commit
from typing import List, Dict, Union, Optional
load_dotenv()

app = FastAPI()

@app.get("/pull/{owner}/{repo}", response_model=List[PR])
async def getpull(owner: str = ..., repo: str = ...):
    return getPRs(owner, repo)

@app.get("/commit/{owner}/{repo}/{pr_number}", response_model=List[Commit])
async def getcommit(owner: str = ..., repo: str = ..., pr_number: int = ...):
    return getCommits(owner, repo, pr_number)