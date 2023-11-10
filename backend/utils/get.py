import requests
import os
from model import PR, Commit
import json
token = os.getenv("GITHUB_SECRET")

def getPRs(owner, repo):
    result = requests.get("https://api.github.com/repos/{}/{}/pulls".format(owner, repo)).json()

    return [PR.model_validate(pr,from_attributes=False) for pr in result]

def getCommits(owner, repo, pr_number):
    result = requests.get("https://api.github.com/repos/{}/{}/pulls/{}/commits".format(owner, repo, pr_number)).json()

    return [Commit.model_validate(commit,from_attributes=False) for commit in result]