from api.adapters.outbound.database.models.log import Log
from api.domain.repositories.ILogRepository import ILogRepository
from django.core.exceptions import ObjectDoesNotExist


# Concrete implementation for Log repository
class LogRepository(ILogRepository):
    def create(self, log: Log) -> Log:
        return Log.objects.create(
            id=log.id,
            run=log.run,
            content=log.content,
            level=log.level,
            executed_at=log.executed_at,
        )

    def update(self, id, newLog: Log) -> bool:
        try:
            Log.objects.filter(id=id).update(
                id=newLog.id,
                run=newLog.run,
                content=newLog.content,
                level=newLog.level,
                executed_at=newLog.executed_at,
            )
            return True
        except ObjectDoesNotExist:
            return False

    def delete(self, id) -> bool:
        try:
            Log.objects.filter(id=id).delete()
            return True
        except ObjectDoesNotExist:
            return False

    def findById(self, id) -> Log:
        return Log.objects.get(id=id)

    def findAll() -> list[Log]:
        return Log.objects.all()
