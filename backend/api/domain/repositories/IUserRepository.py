from api.domain.entities.User import User

# Interface for User repository
class IUserRepository:
    def create(self, user: User) -> User:
        pass
    
    def update(self, id: str, newUser: User) -> bool:
        pass
    
    def delete(self, id: str) -> bool:
        pass
    
    def findById(self, id: str) -> User:
        pass
    
    def findAll(self) -> list[User]:
        pass