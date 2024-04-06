from api.adapters.inbound.http.controllers.authController import AuthController
from api.application.usecases.userUseCase import UserUseCase
from api.application.usecases.tokenUseCase import TokenUseCase
from django.test import TestCase, Client
from django.test.utils import override_settings
from ninja import NinjaAPI
from django.urls import path
from api.tests.unit.mocks.userRepository import MockUserRepository
import json
from unittest.mock import patch, MagicMock
from api.adapters.inbound.http.utils.Auth import cookieAuth, AuthBearer
from api.adapters.inbound.http.utils.Auth import InvalidToken

mockRepository = MockUserRepository()
authController = AuthController(TokenUseCase(), UserUseCase(mockRepository))

api = NinjaAPI(csrf=False, urls_namespace="test-api")
api.add_router("/auth/", authController.get_routes())
urlpatterns = [path("api/", api.urls)]


@override_settings(ROOT_URLCONF=__name__)
class AuthenticationTestCase(TestCase):
    client: Client()

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
        
    def test_valid_csrf(self):
        """ Ensure that the csrf token is retrieved correctly """
        
        # Act
        response = self.client.get("http://localhost:8000/api/auth/csrf")
        
        # Assert
        self.assertEqual(response.status_code, 200)
        self.assertTrue("csrftoken" in response.cookies)
        
        # Act
        csrf_token = response.cookies['csrftoken']

        # Assert
        self.assertNotEqual(csrf_token, '')
    
    def decode_token_mock(self):
       payload = {
            "user":"user123",
            "email":"valid@gmail.com",
            "groups": ["group1","group2"],
        }
       
       return payload
    
    # Que funçãozinha viu...
    def test_valid_access_token(self):
        """ Ensure that the access token is a valid token """
        
        access_token = 'Bearer ' + 'access_token'
        
        with patch('api.application.usecases.tokenUseCase.TokenUseCase.decode_token') as decode_token:
           decode_token.side_effect = self.decode_token_mock()
           response = self.client.get("http://localhost:8000/api/auth/decode", headers={'AUTHORIZATION': access_token}) 
        
        # Assert
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "message":"Token decoded successfully",
            "user":"user123",
            "email":"valid@gmail.com",
            "groups": ["group1", "group2"]
        })
        
    def test_invalid_access_token(self):
        """ Ensure that the token is invalid """
        
        # Mocked invalid token
        token_mock = 'Bearer' + 'invalid_token'
        
        # Act
        response = self.client.get("http://localhost:8000/api/auth/decode", headers={'AUTHORIZATION': token_mock})
             
        # Assert 
        self.assertEqual(response.status_code, 401)