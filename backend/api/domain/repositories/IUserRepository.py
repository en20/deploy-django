from api.domain.entities.User import User
from abc import ABC, abstractmethod


# Interface for User repository
class IUserRepository(ABC):

    @abstractmethod
    def create(self, user: User) -> User:
        pass

    @abstractmethod
    def update(self, id: str, newUser: User) -> bool:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass

    @abstractmethod
    def findById(self, id: str) -> User:
        pass

    @abstractmethod
    def findAll(skip, limit) -> list[User]:
        pass