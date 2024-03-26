from ninja import Router
from django.http import HttpRequest, HttpResponse
from backend.api.application.ports.logPort import ILogUseCase
from backend.api.application.ports.runPort import IRunUseCase


class LogController:
    logUseCase: ILogUseCase
    runUseCase: IRunUseCase

    def __init__(self, logUseCase: ILogUseCase, runUseCase: IRunUseCase):
        self.logUseCase = logUseCase
        self.runUseCase = runUseCase

    def get_router(self):
        router = Router()

        @router.get("/{robotId}/runs/{run_id}/logs", response={200: RunResponse, 400: Error, 404: Error})
        def get_logs(request, robot_id, run_id, skip: int = DEFAULT_SKIP, limit: int = DEFAULT_LIMIT):
            run = getRobotRun(robot_id)

            if run is None:
                return 404, {"error": "this run does not exist"}

            logs = list_logs(run_id)

            return {
                "message": "Logs fetched successfully",
                "run": run,
                "logs": logs,
            }

        @router.get(
            "/{robotId}/runs/{run_id}/logs/count",
            response={200: CountResponse, 400: Error, 404: Error},
        )
        def logs_count(request, robot_id, run_id):
            run = getRobotRun(robot_id)

            if run is None:
                return 404, {"error": "This run does not exist"}

            logs_count = count_logs(run_id)

            return {"message": "Logs count fetched successfully", "count": logs_count}

