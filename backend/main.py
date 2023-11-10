from fastapi import FastAPI, Request
from dotenv import load_dotenv
from utils import getPRs, getCommits, updatePlan, getPRbyBranch, getPoints
from model import PR, Commit, client, Plan, PRCoord
from typing import List, Dict, Union, Optional
from contextlib import asynccontextmanager
import os


load_dotenv()

@asynccontextmanager
async def initMongo(app: FastAPI):
    client.connect()
    yield
    client.close()

app = FastAPI(lifespan=initMongo, responses={404: {"description": "Not found"}})

@app.get("/pull/{owner}/{repo}/{branch}", response_model=List[PR], tags=["pull"])
async def getpull(owner: str = ..., repo: str = ..., branch: str = ...):
    return getPRbyBranch(owner, repo, branch)

@app.get("/pull/{owner}/{repo}", response_model=List[PR], tags=["pull"])
async def getpull(owner: str = ..., repo: str = ...):
    return getPRs(owner, repo)

@app.get("/commit/{owner}/{repo}/{pr_number}", response_model=List[Commit], tags=["commit"])
async def getcommit(owner: str = ..., repo: str = ..., pr_number: int = ...):
    return getCommits(owner, repo, pr_number)

@app.post("/plan", tags=["plan"])
async def addPlan(plan: Plan = ...):
    if plan.branch == None:
        max = (await client.db.plans.aggregate([{"$match": {"repo": plan.repo, "owner": plan.owner,}} ,{"$group": {"_id": None, "max": {"$max": "$count"}}}]).to_list(length=None))
        if max == None or len(max) == 0:
            max = 0
        else:
            max = max[0]["max"] if max[0]["max"] != None else 0
        plan.count = max + 1

        plan.branch = plan.branch if plan.branch != None else "dev-" + str(plan.count)

    await client.db.plans.insert_one(plan.model_dump())
    return {"status": "ok", "branch": plan.branch}

@app.get("/plan/{owner}/{repo}", response_model=List[Plan], tags=["plan"])
async def getPlan(owner: str = ..., repo: str = ...):
    return [Plan.model_validate(plan, from_attributes=False) for plan in await client.db.plans.find({"repo": repo, "owner": owner, "is_active": True}).to_list(length=None)]

@app.patch("/plan/{owner}/{repo}", tags=["plan"])
async def updatePlan(owner: str = ..., repo: str = ...):
    await updatePlan(owner, repo)
    return {"status": "ok"}

@app.get("/point/{owner}/{repo}/{branch}", response_model=List[List[PRCoord]], tags=["point"])
async def PRPoint(owner: str = ..., repo: str = ..., branch: str = ...):
    return getPoints(owner, repo, branch)
