import requests
import os
from model import PRs, PR
import json
token = os.getenv("GITHUB_SECRET")

def getPRs(owner, repo):
    result = requests.get("https://api.github.com/repos/{}/{}/pulls".format(owner, repo)).json()

    return [PR.model_validate(pr,from_attributes=False) for pr in result]