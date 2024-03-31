from api.adapters.outbound.database.models.group import Group as GroupSchema
from api.domain.repositories.IGroupRepository import IGroupRepository
from django.core.exceptions import ObjectDoesNotExist
from api.domain.entities.group import Group


class GroupRepository(IGroupRepository):
    def create(self, group: Group) -> Group:
        return GroupSchema.objects.create(
            id=group.id,
            name=group.name,
            description=group.description,
            created_at=group.created_at,
        )

    def update(self, id, newGroup: Group) -> bool:
        try:
            GroupSchema.objects.filter(id=id).update(
                id=newGroup.id,
                name=newGroup.name,
                description=newGroup.description,
                created_at=newGroup.created_at,
            )
            return True
        except ObjectDoesNotExist:
            return False

    def delete(self, id) -> bool:
        try:
            GroupSchema.objects.filter(id=id).delete()
            return True
        except ObjectDoesNotExist:
            return False

    def findById(self, id) -> Group:
        return self.schemaToGroup(GroupSchema.objects.get(id=id))

    def findAll(self, skip, limit) -> list[Group]:
        return map(self.schemaToGroup, GroupSchema.objects.all()[skip:limit])

    def schemaToGroup(schema: GroupSchema) -> Group:
        return Group(schema.id, schema.name, schema.description, schema.create_at)
