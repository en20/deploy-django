from api.adapters.outbound.database.models.run import Run
from api.domain.repositories.IRunRepository import IRunRepository
from django.core.exceptions import ObjectDoesNotExist


# Concrete Implementation for Run Repository
class RunRepository(IRunRepository):
    def create(self, run: Run) -> Run:
        return Run.objects.create(
            id=run.id,
            task=run.task,
            robot=run.robot,
            status=run.status,
            started_at=run.started_at,
        )

    def update(self, id, newRun: Run) -> bool:
        try:
            Run.objects.filter(id=id).update(
                id=newRun.id,
                robot=newRun.robot,
                task=newRun.task,
                status=newRun.status,
                started_at=newRun.started_at,
            )
            return True
        except ObjectDoesNotExist:
            return False

    def delete(self, id) -> bool:
        try:
            Run.objects.filter(id=id).delete()
            return True
        except ObjectDoesNotExist:
            return False

    def findById(self, id) -> Run:
        try:
            return Run.objects.get(id=id)
        except ObjectDoesNotExist:
            return None

    def findAll(self, skip, limit) -> list[Run]:
        return Run.objects.all()[skip:limit]

    def getRobotRuns(self, robotId) -> list[Run]:
        return Run.objects.filter(robot=robotId)

    def countRobotRuns(self, robotId) -> list[Run]:
        return Run.objects.filter(robot=robotId).count()
