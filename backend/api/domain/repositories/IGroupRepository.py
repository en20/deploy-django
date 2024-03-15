from api.domain.entities.group import Group

# Interface for Group repository
class IGroupRepository:
    def create(self, group: Group) -> Group:
        pass
    
    def update(self, id: str, newGroup: Group) -> bool:
        pass
    
    def delete(self, id: str) -> bool:
        pass
    
    def findById(self, id: str) -> Group:
        pass
    
    def findAll(self) -> list[Group]:
        pass