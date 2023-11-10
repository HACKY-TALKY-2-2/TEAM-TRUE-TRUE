from fastapi import FastAPI
from dotenv import load_dotenv
from utils import getPRs
from model import PRs, PR
from typing import List, Dict, Union, Optional
load_dotenv()

app = FastAPI()

@app.get("/pull/{owner}/{repo}", response_model=List[PR])
async def getpull(owner: str = ..., repo: str = ...):
    return getPRs(owner, repo)