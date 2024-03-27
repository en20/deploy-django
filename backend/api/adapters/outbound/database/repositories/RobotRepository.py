from api.adapters.outbound.database.models.robot import Robot as RobotSchema
from api.domain.entities.robot import Robot
from api.domain.repositories.IRobotRepository import IRobotRepository
from django.core.exceptions import ObjectDoesNotExist


# Concrete Implementation for Robot Repository
class RobotRepository(IRobotRepository):
    def create(self, robot: Robot) -> Robot:
        return self.schemaToRobot(
            Robot.objects.create(
                name=robot.name,
                description=robot.description,
                section_name=robot.section_name,
                group=robot.group,
            )
        )

    def update(self, id, newRobot: Robot) -> bool:
        try:
            Robot.objects.filter(id=id).update(
                name=newRobot.name,
                description=newRobot.description,
                section_name=newRobot.section_name,
                group=newRobot.group,
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
        return self.schemaToRobot(Robot.objects.get(id=id))

    def findAll(self, skip, limit) -> list[Robot]:
        return map(self.schemaToRobot(Robot.objects.all()[skip:limit]))

    def schemaToRobot(schema: RobotSchema) -> Robot:
        return Robot(
            schema.id,
            schema.name,
            schema.description,
            schema.section_name,
            schema.group,
            schema.created_at,
        )
