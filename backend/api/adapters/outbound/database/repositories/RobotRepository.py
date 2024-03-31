from api.adapters.outbound.database.models.robot import Robot as RobotSchema
from api.domain.repositories.IRobotRepository import IRobotRepository
from django.core.exceptions import ObjectDoesNotExist
from api.domain.entities.robot import Robot


class RobotRepository(IRobotRepository):
    def create(self, robot: Robot) -> Robot:
        return self.schemaToRobot(
            RobotSchema.objects.create(
                name=robot.name,
                description=robot.description,
                section_name=robot.section_name,
                group=robot.group,
            )
        )

    def update(self, id, newRobot: Robot) -> bool:
        try:
            RobotSchema.objects.filter(id=id).update(
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
            RobotSchema.objects.filter(id=id).delete()
            return True
        except ObjectDoesNotExist:
            return False

    def findById(self, id) -> Robot:
        return self.schemaToRobot(RobotSchema.objects.get(id=id))

    def findAll(self, skip, limit) -> list[Robot]:
        return map(self.schemaToRobot, RobotSchema.objects.all()[skip:limit])

    def findAllByGroups(self, groups: list[str]) -> list[Robot]:
        return map(
            self.schemaToRobot,
            filter(lambda robot: robot.group.id in groups, RobotSchema.objects.all()),
        )

    def schemaToRobot(schema: RobotSchema) -> Robot:
        return Robot(
            schema.id,
            schema.name,
            schema.description,
            schema.section_name,
            schema.group,
            schema.created_at,
        )
