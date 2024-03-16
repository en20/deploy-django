from api.domain.entities.group import Group
from abc import ABC, abstractmethod


# Interface for Group repository
class IGroupRepository(ABC):

    @abstractmethod
    def create(self, group: Group) -> Group:
        pass

    @abstractmethod
    def update(self, id: str, newGroup: Group) -> bool:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass

    @abstractmethod
    def findById(self, id: str) -> Group:
        pass

    @abstractmethod
    def findAll(skip, limit) -> list[Group]:
        pass