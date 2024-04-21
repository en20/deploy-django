from api.domain.entities.robot import Robot
from abc import ABC, abstractmethod
from api.adapters.outbound.database.models.robot import Robot as RobotSchema


# Interface for Robot repository
class IRobotRepository(ABC):

    @abstractmethod
    def create(
        self, name: str, description: str, section_name: str, group: str
    ) -> Robot:
        pass

    @abstractmethod
    def rawCreate(self, name: str, description: str, section_name: str, group: str) -> RobotSchema:
        pass

    @abstractmethod
    def update(
        self, id: str, name: str, description: str, section_name: str, group: str
    ) -> bool:
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
