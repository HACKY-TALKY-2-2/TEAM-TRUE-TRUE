from typing import List, Dict, Union, Optional

from pydantic import BaseModel

class User(BaseModel):
    id: int
    login: str
    avatar_url: str = None

class PR(BaseModel):
    id: int
    html_url: str
    title: Optional[str] = None
    body: Optional[str] = None
    created_at: str
    meraged_at: Optional[str] = None
    assignees: Optional[List[User]] = None
    url: str
    draft: bool
    head: dict
    state: str

class CommitDetail(BaseModel):
    message: Optional[str] = None

class Commit(BaseModel):
    sha: str
    url: str
    message: Optional[str] = None
    author: User
    committer: User

    def __init__(self, **data):
        data["message"] = data["commit"]["message"]
        super().__init__(**data)



