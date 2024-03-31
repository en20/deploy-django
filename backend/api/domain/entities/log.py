from datetime import date
from pydantic import BaseModel


# Log entity
class Log(BaseModel):
    id: str
    run: str
    content: str
    level: str
    executed_at: date

    def __init__(
        self, id: str, run: str, content: str, level: str, executed_at: date
    ) -> None:
        self.id = id
        self.run = run
        self.content = content
        self.level = level
        self.executed_at = executed_at

    def __str__(self) -> str:
        return f"{self.run}"
