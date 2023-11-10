from pydantic import BaseModel, Field
from typing import Optional
from .PR import User

class Plan(BaseModel):
    name: str
    description: Optional[str] = None
    author: User
    repo: str
    owner: str
    branch: Optional[str] = None
    count: int = 0
    is_active: bool = True


    model_config ={
        "json_schema_extra" : {
            "example": {
                "name": "Test",
                "description": "Test",
                "author": {
                    "id": 1,
                    "login": "test",
                    "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4"
                },
                "repo": "test",
                "owner": "test",
                "branch": "dev-1",
            }
        }
    }