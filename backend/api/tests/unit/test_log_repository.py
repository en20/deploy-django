"""
from django.test import TestCase

from api.adapters.outbound.database.models.log import Log
from api.adapters.outbound.database.repositories.LogRepository import LogRepository

log_repo = LogRepository()


class TestLogRepository(TestCase):

    def test_log_create(self):

        # Arrange
        test_log = log_repo.create(run="jon's run", content="this is a test", level="jon")

        # Act and Assert
        self.assertIsNotNone(test_log)
        self.assertEqual(test_log.run, "jon's run")
        self.assertEqual(test_log.content, "this is a test")
        self.assertEqual(test_log.level, "jon")

    def test_log_update(self):

        # Arrange
        test_log = log_repo.create(run="jon's run", content="this is a test", level="jon")

        # Act
        u_result = log_repo.update(test_log.id, "the_jons", "not being baianos", "not_jon")
        id_result = log_repo.findById(test_log.id)

        # Assert
        self.assertEquals(True, u_result)
        self.assertEqual(id_result.run, "the_jons")
        self.assertEqual(id_result.content, "not being baianos")
        self.assertEqual(id_result.level, "not_jon")

    def test_log_delete(self):
        # Arrange
        test_log = log_repo.create(run="jon's run", content="this is a test", level="jon")

        # Act
        result = log_repo.delete(test_log.id)

        # Assert
        self.assertEqual(True, result)

    def test_log_find_by_id(self):

        # Arrange
        test_log = log_repo.create(
            run="jon's run", content="this is a test", level="jon")

        # Act
        result = log_repo.findById(test_log)

        # Assert
        self.assertEqual(test_log, result)

    def test_log_find_all(self):

        # Arrange
        test_log_one = log_repo.create(
            run="jon's run", content="this is a test", level="jon")
        test_log_two = log_repo.create(
            run="jon's run", content="this is a test", level="jon")

        # Act
        check_list = log_repo.findAll(0, 2)

        # Assert
        self.assertEquals(check_list[0], test_log_one)
        self.assertEquals(check_list[1], test_log_two)



    # def test_log_get_logs_by_run_id(self):
        test_log = log_repo.create(
            run="jon's run", content="this is a test", level="jon")
        s
    # def test_log_count_logs_by_run_id(self):

"""
