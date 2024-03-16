from abc import ABC, abstractmethod
from api.domain.entities.run import Run

class RunPort(ABC):
    
    @abstractmethod
    def getRobotRun(self, robot, skip, limit) -> list[Run]:
        pass
    
    @abstractmethod
    def countRobotRuns(self, robot) -> int:
        pass
    