from ninja import Schema


class LogCountResponse(Schema):
    message: str
    count: int
