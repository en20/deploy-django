from api.domain.entities.log import Log
from abc import ABC, abstractmethod


# Interface for Log repository
class ILogRepository(ABC):

    @abstractmethod
    def create(self, log: Log) -> Log:
        pass

    @abstractmethod
    def update(self, id: str, newLog: Log) -> bool:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass

    @abstractmethod
    def findById(self, id: str) -> Log:
        pass

    @abstractmethod
    def findAll(self, skip, limit) -> list[Log]:
        pass
