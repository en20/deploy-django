from api.domain.entities.log import Log

# Interface for Log repository
class ILogRepository:
    def create(self, log: Log) -> Log:
        pass
    
    def update(self, id: str, newLog: Log) -> bool:
        pass
    
    def delete(self, id: str) -> bool:
        pass
    
    def findById(self, id: str) -> Log:
        pass
    
    def findAll(self) -> list[Log]:
        pass