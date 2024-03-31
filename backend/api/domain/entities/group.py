from datetime import date
from pydantic import BaseModel


# Group entity
class Group(BaseModel):
    id: str
    name: str
    description: str
    created_at: date

    def __init__(self, id: str, name: str, description: str, created_at: date) -> None:
        self.id = id
        self.name = name
        self.description = description
        self.created_at = created_at

    def __str__(self) -> str:
        return f"{self.name}"
