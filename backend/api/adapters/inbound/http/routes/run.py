from api.adapters.inbound.http.controllers.runController import RunController
from api.adapters.outbound.database.repositories.RunRepository import RunRepository
from api.application.usecases.runUseCase import RunUseCase


class RunRouter:
    controller: RunController

    def __init__(self) -> None:
        runRepository = RunRepository()
        runUseCase = RunUseCase(runRepository)
        self.controller = RunController(runUseCase)

    def get_router(self):
        return self.controller.get_routes()
