from api.domain.entities.user import User
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
    def findByEmail(self, email: str) -> User:
        pass

    @abstractmethod
    def findAll(self, skip, limit) -> list[User]:
        pass
