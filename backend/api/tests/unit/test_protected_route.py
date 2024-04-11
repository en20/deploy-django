from django.test import SimpleTestCase
from api.tests.testApi import mockRobotRepository, mockRepository

class TestProtectedRoute(SimpleTestCase):
    def setUp(self):
        for robot in mockRobotRepository.findAll(0, 0):
            mockRobotRepository.delete(robot.id)

    def test_the_robot_route_is_protected(self):
        """ " Ensure the route is protected"""
        
        # Arrange
        invalid_token = "invalid_token"

        # Act
        route_response = self.client.get(
            "/api/robot/", HTTP_AUTHORIZATION=f"Bearer {invalid_token}"
        )

        # Assert
        self.assertEqual(route_response.status_code, 401)
