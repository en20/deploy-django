from ninja import NinjaAPI
from api.adapters.inbound.http.controllers.RunController import RunController
from api.adapters.outbound.database.repositories.RunRepository import RunRepository
from api.application.usecases.runUseCase import RunUseCase

api = NinjaAPI()

runRepository = RunRepository()
runUseCase = RunUseCase(runRepository)
runController = RunController(runUseCase)

api.add_router("/robots/", runController.getRouter())
