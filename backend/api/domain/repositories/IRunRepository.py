from api.domain.entities.run import Run

# Interface for Run repository
class IRunRepository:
    def create(self, run: Run) -> Run:
        pass
    
    def update(self, id: str, newRun: Run) -> bool:
        pass
    
    def delete(self, id: str) -> bool:
        pass
    
    def findById(self, id: str) -> Run:
        pass
    
    def findAll(self) -> list[Run]:
        pass