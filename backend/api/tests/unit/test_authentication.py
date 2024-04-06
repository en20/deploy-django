from api.domain.repositories.IUserRepository import IUserRepository
from api.domain.entities.user import User
from api.adapters.outbound.database.models.utils import id_generator
from api.adapters.inbound.http.controllers.authController import AuthController
from api.application.usecases.userUseCase import UserUseCase
from api.application.usecases.tokenUseCase import TokenUseCase
from django.test import TestCase, Client
from django.test.utils import override_settings
from ninja import NinjaAPI
from django.urls import path
import json


class MockUserRepository(IUserRepository):
    database: list[User] = []

    def create(self, name: str, email: str, password: str) -> User:
        user = User(id_generator(), name, email, password, "now", ["group1"])
        self.database.append(user)
        return user

    def update(self, id, name: str, email: str, password: str) -> bool:
        for i in range(len(self.database)):
            current_user = self.database[i]
            if current_user.id == id:
                self.database[i] = User(
                    current_user.id,
                    name,
                    email,
                    password,
                    current_user.created_at,
                    current_user.groups,
                )
                return True
        return False

    def delete(self, id) -> bool:
        for i in range(len(self.database)):
            if self.database[i].id == id:
                self.database.pop(i)
                return True
        return False

    def findById(self, id) -> User:
        for i in range(len(self.database)):
            if self.database[i].id == id:
                return self.database[i]
        return None

    def findByEmail(self, email: str) -> User:
        for i in range(len(self.database)):
            if self.database[i].email == email:
                return self.database[i]
        return None

    def findAll(self, skip, limit) -> list[User]:
        return self.database


mockRepository = MockUserRepository()
authController = AuthController(TokenUseCase(), UserUseCase(mockRepository))

api = NinjaAPI(csrf=False, urls_namespace="test-api")
api.add_router("/auth/", authController.get_routes())
urlpatterns = [path("api/", api.urls)]


@override_settings(ROOT_URLCONF=__name__)
class AuthenticationTestCase(TestCase):
    client: Client

    def setUp(self):
        self.client = Client()
        # Clean up mock repository
        for user in mockRepository.findAll(0, 0):
            mockRepository.delete(user.id)

    def test_user_login(self):
        """User should log in successfully"""

        # Arrange
        user = mockRepository.create("Jonn", "john@gmail.com", "galindo")
        # Act
        response = self.client.post(
            "http://localhost:8000/api/auth/login",
            json.dumps({"email": user.email, "password": user.password}),
            content_type="application/json",
        )
        # Assert
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["message"], "logged in successfully")

    def test_invalid_email(self):
        """Avoid logging in with invalid email"""
        # Arrange
        email = "invalid@gmail.com"
        password = "12345"
        # Act
        response = self.client.post(
            "http://localhost:8000/api/auth/login",
            json.dumps({"email": email, "password": password}),
            content_type="application/json",
        )
        # Assert
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "Email invalido")

    def test_invalid_password(self):
        """Avoid logging in with invalid password"""
        # Arrange
        user = mockRepository.create("Jonn", "john@gmail.com", "galindo")
        # Act
        response = self.client.post(
            "http://localhost:8000/api/auth/login",
            json.dumps({"email": user.email, "password": "12345"}),
            content_type="application/json",
        )
        # Assert
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"], "Senha incorreta")
