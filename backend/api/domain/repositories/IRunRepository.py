from api.domain.entities.run import Run
from abc import ABC, abstractmethod


# Interface for Run repository
class IRunRepository(ABC):

    @abstractmethod
    def create(self, run: Run) -> Run:
        pass

    @abstractmethod
    def update(self, id: str, newRun: Run) -> bool:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass

    @abstractmethod
    def findById(self, id: str) -> Run:
        pass

    @abstractmethod
    def findAll() -> list[Run]:
        pass
