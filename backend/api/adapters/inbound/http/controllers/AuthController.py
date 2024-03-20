from ninja import Router
from api.token import generate_jwt_token, verify_jwt_token, decode_jwt_token
from django.http import HttpRequest, HttpResponse
from api.auth import cookieAuth, AuthBearer
from api.repositories.user import get_user_by_email
from django.middleware.csrf import get_token
from api.application.ports.tokenPort import ITokenUseCase
from api.application.ports.UserPort import IUserUseCase
from api.adapters.inbound.http.dtos.Auth import LoginRequestBody, DecodeResponse, AccessResponse, Error
from api.adapters.inbound.http.utils.Auth import Auth

router = Router()

class AuthController:
    tokenUseCase: ITokenUseCase
    userUseCase: IUserUseCase

    def __init__(self, tokenUseCase : ITokenUseCase, userUseCase : IUserUseCase):
            self.tokenUseCase = tokenUseCase
            self.userUseCase = userUseCase

    def extract_groups(user):
        groups = []
        for group in user.groups.all():
            groups.append(group.id)
        return groups

    def get_router(self):
        router = Router()


        @router.post("/login", response={200: AccessResponse, 400: Error})
        def login(request: HttpRequest, response: HttpResponse, credentials: LoginRequestBody):
            user = self.userUseCase.get_user_by_email(credentials.email)

            if len(user) == 0:
                return 400, {"error": "Email invalido"}

            if user[0].password != credentials.password:
                return 400, {"error": "Senha incorreta"}

            user_groups = extract_groups(user[0])

            access_token = self.tokenUseCase.generate_jwt_token(
                user[0].id, user[0].email, user_groups, "access_token"
            )
            refresh_token = self.tokenUseCase.generate_jwt_token(
                user[0].id, user[0].email, user_groups, "refresh_token"
            )

            response.set_cookie("refresh_token", refresh_token, httponly=True)

            return {
                "message": "logged in successfully",
                "access_token": access_token,
            }


        @router.get("/decode", auth=AuthBearer(), response={200: DecodeResponse, 401: Error})
        def decode(request: HttpRequest, response: HttpResponse):
            access_token = request.auth

            payload = self.tokenUseCase.decode_jwt_token(access_token)

            return {
                "message": "Token decoded successfully",
                "user": payload["user"],
                "email": payload["email"],
                "groups": payload["groups"]
            }


        @router.get("/refresh", auth=cookieAuth, response={200: AccessResponse, 401: Error})
        def refresh(request):
            refresh_token = request.auth

            _, message = self.tokenUseCase.verify_jwt_token(refresh_token, "refresh_token")

            payload = self.tokenUseCase.decode_jwt_token(refresh_token)

            access_token = self.tokenUseCase.generate_jwt_token(
                payload["user"], payload["email"], payload["groups"], "access_token"
            )

            return {
                "message": "Token refreshed successfully",
                "access_token": access_token,
            }
