from ninja import NinjaAPI
from api.adapters.inbound.http.routes.run import RunRouter
from api.adapters.inbound.http.routes.auth import AuthRouter
from api.adapters.inbound.http.routes.log import LogRouter
from api.adapters.inbound.http.routes.robot import RobotRouter


api = NinjaAPI()

runRouter = RunRouter()
logRouter = LogRouter()
authRouter = AuthRouter()
robotRouter = RobotRouter()

api.add_router("/robots/", robotRouter.get_router())
api.add_router("/robots/", runRouter.get_router())
api.add_router("/robots/", logRouter.get_router())
api.add_router("/auth/", authRouter.get_router())
