from datetime import date
from pydantic import BaseModel


class Run(BaseModel):
    id: str
    robot: str
    task: str
    status: str
    started_at: date

    def __init__(
        self, id: str, robot: str, task: str, status: str, started_at: date
    ) -> None:
        self.id = id
        self.robot = robot
        self.task = task
        self.status = status
        self.started_at = started_at

    def __str__(self) -> str:
        return f"{self.robot}"
