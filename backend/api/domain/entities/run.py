from datetime import date


# Run entity
class Run:
    id: str
    robot: str
    task: str
    started_at: date

    def __init__(self, id: str, robot: str, task: str, started_at: date) -> None:
        self.id = id
        self.robot = robot
        self.task = task
        self.started_at = started_at

    def __str__(self) -> str:
        return f"{self.robot}"
