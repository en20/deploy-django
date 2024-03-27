from api.adapters.outbound.database.models.log import Log as LogSchema
from api.domain.entities.log import Log
from api.domain.repositories.ILogRepository import ILogRepository
from django.core.exceptions import ObjectDoesNotExist


# Concrete implementation for Log repository
class LogRepository(ILogRepository):
    def create(self, log: Log) -> Log:
        return self.schemaToLog(
            Log.objects.create(
                run=log.run,
                content=log.content,
                level=log.level,
            )
        )

    def update(self, id, newLog: Log) -> bool:
        try:
            Log.objects.filter(id=id).update(
                run=newLog.run,
                content=newLog.content,
                level=newLog.level,
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
        return self.schemaToLog(Log.objects.get(id=id))

    def findAll(self, skip, limit) -> list[Log]:
        return map(self.schemaToLog, Log.objects.all()[skip:limit])

    def schemaToLog(schema: LogSchema) -> Log:
        return Log(
            schema.id, schema.run, schema.content, schema.level, schema.executed_at
        )

    def get_logs_by_run_id(self, run_id) -> list[Log]:
        return map(self.schemaTolog, Log.objects.filter(run=run_id))

    def count_logs_by_run_id(self, run_id) -> int:
        return Log.objects.filter(run=run_id).count()
