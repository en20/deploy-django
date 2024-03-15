from api.adapters.outbound.database.models.robot import Robot
from api.domain.repositories.IRobotRepository import IRobotRepository

# Concrete Implementation for Robot Repository
class RobotRepository(IRobotRepository):
    def create(robot: Robot) -> Robot:
        pass