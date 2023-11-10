import requests
import os
from model import PR, Commit, client, Plan
import json
from dotenv import load_dotenv

load_dotenv()

token = os.getenv("GITHUB_SECRET")

def getPRs(owner, repo):
    page = 1
    result = []
    while True:
        temp = requests.get("https://api.github.com/repos/{}/{}/pulls?page={}".format(owner, repo, page), headers={"Authorization": "Bearer " + token}).json()
        if len(temp) == 0:
            break
        result.extend(temp)
        page += 1
    
    return [PR.model_validate(pr,from_attributes=False) for pr in result]

def getPRbyBranch(owner, repo, branch):
    page = 1
    result = []

    while True:
        temp = requests.get("https://api.github.com/repos/{}/{}/pulls?page={}&base={}".format(owner, repo, page, branch), headers={"Authorization": "Bearer " + token}).json()
        if len(temp) == 0:
            break
        result.extend(temp)
        page += 1

    return [PR.model_validate(pr,from_attributes=False) for pr in result]

def getCommits(owner, repo, pr_number):
    page = 1
    result = []
    while True:
        temp = requests.get("https://api.github.com/repos/{}/{}/pulls/{}/commits?page={}".format(owner, repo, pr_number, page), headers={"Authorization": "Bearer " + token}).json()
        if len(temp) == 0:
            break
        result.extend(temp)
        page += 1

    return [Commit.model_validate(commit,from_attributes=False) for commit in result]

async def updatePlan(owner, repo):
    result = getPRs(owner, repo)
    plans = [Plan.model_validate(plan, from_attributes=False).branch for plan in await client.db.plans.find({"repo": repo, "owner": owner, "is_active": True}).to_list(length=None)]

    for pr in result:
        if pr.head['ref'] in plans:
            await client.db.plans.update_one({"repo": repo, "owner": owner, "branch": pr.head['ref']}, {"$set": {"is_active": False}})