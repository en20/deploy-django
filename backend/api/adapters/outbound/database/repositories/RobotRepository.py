from api.adapters.outbound.database.models.robot import Robot
from api.domain.repositories.IRobotRepository import IRobotRepository
from django.core.exceptions import ObjectDoesNotExist


# Concrete Implementation for Robot Repository
class RobotRepository(IRobotRepository):
    def create(self, robot: Robot) -> Robot:
        return Robot.objects.create(
            id=robot.id,
            name=robot.name,
            description=robot.description,
            section_name=robot.section_name,
            group=robot.group,
            created_at=robot.created_at,
        )

    def update(self, id, newRobot: Robot) -> bool:
        try:
            Robot.objects.filter(id=id).update(
                id=newRobot.id,
                name=newRobot.name,
                description=newRobot.description,
                section_name=newRobot.section_name,
                group=newRobot.group,
                created_at=newRobot.created_at,
            )
            return True
        except ObjectDoesNotExist:
            return False

    def delete(self, id) -> bool:
        try:
            Robot.objects.filter(id=id).delete()
            return True
        except ObjectDoesNotExist:
            return False

    def findById(self, id) -> Robot:
        return Robot.objects.get(id=id)

    def findAll(skip, limit) -> list[Robot]:
        return Robot.objects.all()[skip:limit]
