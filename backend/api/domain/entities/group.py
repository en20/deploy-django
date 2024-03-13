from datetime import date


# Group entity
class Group:
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
