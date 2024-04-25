"""
from django.test import TestCase

from api.adapters.outbound.database.models.run import Run
from api.adapters.outbound.database.repositories.RunRepository import RunRepository
from api.adapters.outbound.database.repositories.GroupRepository import GroupRepository
from api.adapters.outbound.database.repositories.RobotRepository import RobotRepository

run_repo = RunRepository()
robot_repo = RobotRepository()
group_repo = GroupRepository()


class TestGroupRepository(TestCase):

    def test_run_creation(self):

        # Arrange
        test_group = group_repo.rawCreate(name="autobots", description="this is a test")
        test_robot = robot_repo.rawCreate(
            name="autobots",
            description="this is a test",
            section_name="test",
            group=test_group,
        )
        test_run = run_repo.create(task="autobots", robot=test_robot)

        # Act and Assert
        self.assertIsNotNone(test_run)
        self.assertEqual(test_run.task, "autobots")
        self.assertEqual(test_run.robot, test_robot.id)

    def test_run_update(self):

        # Arrange
        test_group = group_repo.rawCreate(name="autobots", description="this is a test")
        test_robot = robot_repo.rawCreate(
            name="autobots",
            description="this is a test",
            section_name="test",
            group=test_group,
        )
        test_run = run_repo.create(task="autobots", robot=test_robot)

        # Act
        u_result = run_repo.update(test_run.id, "the_jons", "")
        id_result = run_repo.findById(test_run.id)

        # Assert
        self.assertEqual(True, u_result)
        self.assertEqual(id_result.task, "the_jons")
        self.assertEqual(id_result.robot, "not being baianos")

    def test_run_delete(self):
        # Arrange
        test_run = test_run = run_repo.create(task="autobots", robot="this is a test")

        # Act
        result = run_repo.delete(test_run.id)

        # Assert
        self.assertEqual(True, result)

    def test_run_find_by_id(self):

        # Arrange
        test_run = test_run = run_repo.create(task="autobots", robot="this is a test")

        # Act
        result = run_repo.findById(test_run.id)

        # Assert
        self.assertEqual(test_run, result)

    def test_run_find_all(self):

        # Arrange
        test_run_one = run_repo.create(task="autobots", robot="this is a test")

        test_run_two = run_repo.create(task="autobots", robot="this is a test")

        # Act
        check_list = run_repo.findAll(0, 2)

        # Assert
        self.assertEquals(check_list[0], test_run_one)
        self.assertEquals(check_list[1], test_run_two)

    def test_run_get_robot_runs(self):


    # def test_run_count_robot_runs(self):
    
"""