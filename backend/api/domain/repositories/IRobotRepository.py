from api.domain.entities.Robot import Robot

# Interface for Robot repository
class IRobotRepository:
    def create(self, robot: Robot) -> Robot:
        pass
    
    def update(self, id: str, newRobot: Robot) -> bool:
        pass
    
    def delete(self, id: str) -> bool:
        pass
    
    def findById(self, id: str) -> Robot:
        pass
    
    def findAll(self) -> list[Robot]:
        pass