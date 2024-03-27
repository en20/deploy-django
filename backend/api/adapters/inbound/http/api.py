from ninja import NinjaAPI
from api.adapters.inbound.http.routes.run import RunRouter
from api.adapters.inbound.http.routes.auth import AuthRouter

api = NinjaAPI()

runRouter = RunRouter()
authRouter = AuthRouter()

api.add_router("/robots/", runRouter.get_router())
api.add_router("/auth/", authRouter.get_router())
