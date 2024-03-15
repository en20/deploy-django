from api.adapters.outbound.database.models.run import Run
from api.domain.repositories.IRunRepository import IRunRepository

# Concrete Implementation for Run Repository
class RunRepository(IRunRepository):
    def create(run: Run) -> Run:
        pass