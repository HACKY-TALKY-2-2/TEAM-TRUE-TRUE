import requests
import os
from model import PR, Commit, client, Plan
import json
from .calculate import generate_coords
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("GITHUB_SECRET")
print(token)
headers = {
    "Accept" : "application/vnd.github+json",
    "Authorization": "Bearer " + token,
}

def getPRs(owner, repo):
    page = 1
    result = []
    while True:
        temp = requests.get("https://api.github.com/repos/{}/{}/pulls?page={}&state=all&per_page=100".format(owner, repo, page), headers=headers)
        if temp.status_code != 200 or temp is dict:
            print(temp.json())
            return []
        temp = temp.json()
        if len(temp) == 0:
            break
        result.extend(temp)
        page += 1
    
    return [PR.model_validate(pr,from_attributes=False) for pr in result]

def getPRbyBranch(owner, repo, branch):
    page = 1
    result = []

    while True:
        temp = requests.get("https://api.github.com/repos/{}/{}/pulls?page={}&base={}&state=all&per_page=100".format(owner, repo, page, branch), headers=headers)
        if temp.status_code != 200 or temp is dict:
            print(temp.json())
            return []
        temp = temp.json()
        
        if len(temp) == 0:
            break
        result.extend(temp)
        page += 1

    return [PR.model_validate(pr,from_attributes=False) for pr in result]

def getCommits(owner, repo, pr_number):
    page = 1
    result = []
    while True:
        temp = requests.get("https://api.github.com/repos/{}/{}/pulls/{}/commits?page={}&per_page=100".format(owner, repo, pr_number, page), headers=headers)
        if temp.status_code != 200:
            print(temp.json())
            return []
        temp = temp.json()
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

def getPoints(owner, repo, branch):
    result = getPRbyBranch(owner, repo, branch)
    
    userList = []
    for pr in result:
        if pr.user not in userList:
            userList.append(pr.user)
    
    return generate_coords(result, userList)