from datetime import date

# User Entity
class User:
    id: str
    name: str
    email: str
    password: str
    created_at: date
    groups: list[str]

    def __init__(
        self,
        id: str,
        name: str,
        email: str,
        password: str,
        created_at: date,
        groups: list[str],
    ) -> None:
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.created_at = created_at
        self.groups = groups

    def __str__(self) -> str:
        return f"{self.name}"
