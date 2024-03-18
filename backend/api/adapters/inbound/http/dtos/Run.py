from ninja import ModelSchema, Schema
from api.adapters.outbound.database.models.run import Run


class RunSchema(ModelSchema):
    class Config:
        model = Run
        model_fields = ["id", "robot", "task", "status", "started_at"]


class RunResponse(Schema):
    message: str
    runs: list[RunSchema]


class RunCountResponse(Schema):
    message: str
    count: int
