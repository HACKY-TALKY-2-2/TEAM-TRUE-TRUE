import requests

import json

headers = {
    "Accept" : "application/vnd.github+json",
    "Authorization": "Bearer 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"
}

result = requests.get("https://api.github.com/repos/sparcs-kaist/taxi-app/pulls?page=1", headers=headers).json()

print(result)