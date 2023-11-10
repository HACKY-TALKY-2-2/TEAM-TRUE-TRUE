from typing import List, Dict, Union, Optional

from pydantic import BaseModel

class User(BaseModel):
    id: int
    login: str
    avatar_url: str

class PR(BaseModel):
    id: int
    title: str
    body: str
    created_at: str
    meraged_at: Optional[str] = None
    assignees: List[User]
    url: str
    draft: bool
    head: dict
    base: dict

class PRs(BaseModel):
    List[PR]


