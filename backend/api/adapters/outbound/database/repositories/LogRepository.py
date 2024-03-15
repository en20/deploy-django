from api.adapters.outbound.database.models.log import Log
from api.domain.repositories.ILogRepository import ILogRepository

# Concrete implementation for Log repository
class LogRepository(ILogRepository):
    def create(log: Log) -> Log:
        return Log.objects.create(id=log)