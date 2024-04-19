from django.test import SimpleTestCase

from backend.api.adapters.outbound.database.models.group import Group
from backend.api.adapters.outbound.database.repositories.GroupRepository import GroupRepository


class TestGroupRepository(SimpleTestCase):

    def setUp(self):
        self.group_repo = GroupRepository()

    def test_group_creation(self):

        # Arrange
        test_group = self.group_repo.create(name="autobots", description="this is a test")

        # Act and Assert
        self.assertIsNotNone(test_group)
        self.assertEqual(test_group.name, "autobots")
        self.assertEqual(test_group.description, "this is a test")

    def test_group_update(self):

        # Arrange
        test_group = self.group_repo.create(name="autobots", description="this is a test")

        # Act
        self.group_repo.update(test_group, "the_jons", "not being baianos")

        # Assert
        self.assertEqual(test_group.name, "the_jons")
        self.assertEqual(test_group.description, "not being baianos")

    def test_group_delete(self):
        # Arrange
        test_group = self.group_repo.create(name="autobots", description="this is a test")

        # Act
        self.group_repo.delete(test_group)

        # Assert
        self.assertIsNone(test_group)

    # Do I need to make test_group an entity_group?
    def test_group_schema_to_group(self):
        # Arrange
        test_group = self.group_repo.create(name="autobots", description="this is a test")

        # Act
        entity_group = self.group_repo.schemaToGroup(test_group)

        # Assert
        self.assertIsNotNone(entity_group)

    def test_group_find_by_id(self):

        # Arrange
        test_group = self.group_repo.create(name="autobots", description="this is a test")

        # Act and Assert
        self.assertEqual(self.group_repo.findById(test_group), test_group)

    def test_group_find_all(self):

        # Arrange
        test_group_one = self.group_repo.create(name="autobots", description="this is a test")
        test_group_two = self.group_repo.create(name="autobots", description="this is a test")

        # Act
        check_list = self.group_repo.findAll(Group, 2)

        # Assert
        self.assertEquals(check_list[0], test_group_one)
        self.assertEquals(check_list[1], test_group_two)


