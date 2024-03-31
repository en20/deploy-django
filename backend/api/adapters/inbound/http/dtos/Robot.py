from ninja import Schema
from api.domain.entities.robot import Robot


class RobotResponse(Schema):
    message: str
    robot: list[Robot]
