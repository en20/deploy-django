from api.application.ports.runPort import IRunUseCase
from api.domain.entities.run import Run
from api.adapters.outbound.database.repositories.RunRepository import RunRepository


class RunUseCase(IRunUseCase):
    runRepository: RunRepository

    def __init__(self, runRepository: RunRepository) -> None:
        self.runRepository = runRepository

    def getRobotRun(self, robot, skip, limit) -> list[Run]:
        return self.runRepository.getRobotRuns(robot=robot)[skip:limit]

    def countRobotRuns(self, robot) -> int:
        return self.runRepository.countRobotRuns(robot)

    def updateRunStatus(self, run: Run, status: str) -> bool:
        run.status = status
        return self.runRepository.update(run.id, run)
