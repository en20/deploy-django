from datetime import date
from pydantic import BaseModel


class Robot(BaseModel):
    id: str
    name: str
    description: str
    section_name: str
    group: str
    created_at: date

    def __init__(
        self,
        id: str,
        name: str,
        description: str,
        section_name: str,
        group: str,
        created_at: date,
    ) -> None:
        self.id = id
        self.name = name
        self.description = description
        self.section_name = section_name
        self.group = group
        self.created_at = created_at

    def __str__(self) -> str:
        return f"{self.name}"
