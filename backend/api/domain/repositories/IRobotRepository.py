from api.domain.entities.Robot import Robot
from abc import ABC, abstractmethod


# Interface for Robot repository
class IRobotRepository(ABC):

    @abstractmethod
    def create(self, robot: Robot) -> Robot:
        pass

    @abstractmethod
    def update(self, id: str, newRobot: Robot) -> bool:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass

    @abstractmethod
    def findById(self, id: str) -> Robot:
        pass

    @abstractmethod
    def findAll(self, skip, limit) -> list[Robot]:
        pass

    @abstractmethod
    def findAllByGroups(self, groups: list[str]) -> list[Robot]:
        pass
