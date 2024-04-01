from abc import ABC, abstractmethod
from api.domain.entities.run import Run


class IRunUseCase(ABC):
    @abstractmethod
    def getRobotRuns(self, robot, skip, limit) -> list[Run]:
        pass

    @abstractmethod
    def countRobotRuns(self, robot) -> int:
        pass

    @abstractmethod
    def updateRunStatus(self, run: Run, status: str) -> bool:
        pass
