from api.adapters.outbound.database.models.group import Group as GroupSchema
from api.domain.entities.group import Group
from api.domain.repositories.IGroupRepository import IGroupRepository
from django.core.exceptions import ObjectDoesNotExist


class GroupRepository(IGroupRepository):
    def create(self, group: Group) -> Group:
        return self.schemaToGroup(
            Group.objects.create(
                name=group.name,
                description=group.description,
            )
        )

    def update(self, id, newGroup: Group) -> bool:
        try:
            Group.objects.filter(id=id).update(
                name=newGroup.name,
                description=newGroup.description,
            )
            return True
        except ObjectDoesNotExist:
            return False

    def delete(self, id) -> bool:
        try:
            Group.objects.filter(id=id).delete()
            return True
        except ObjectDoesNotExist:
            return False

    def findById(self, id) -> Group:
        return self.schemaToGroup(Group.objects.get(id=id))

    def findAll(self, skip, limit) -> list[Group]:
        return self.schemaToGroup(Group.objects.all()[skip:limit])

    def schemaToGroup(schema: GroupSchema) -> Group:
        return Group(schema.id, schema.name, schema.description, schema.create_at)
