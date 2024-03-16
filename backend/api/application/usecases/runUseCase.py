from api.application.ports.runPort import RunPort
from api.domain.entities.run import Run
from api.adapters.outbound.database.repositories.RunRepository import RunRepository


class RunUseCase(RunPort):
    runRepository: RunRepository

    def __init__(self, runRepository: RunRepository) -> None:
        self.runRepository = runRepository

    def getRobotRun(self, robot, skip, limit) -> list[Run]:
        return self.runRepository.getRobotRuns(robot=robot)[skip:limit]

    def countRobotRuns(self, robot) -> int:
        return self.runRepository.countRobotRuns(robot)
