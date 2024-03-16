from api.adapters.outbound.database.models.group import Group
from api.domain.repositories.IGroupRepository import IGroupRepository
from django.core.exceptions import ObjectDoesNotExist


class GroupRepository(IGroupRepository):
    def create(self, group: Group) -> Group:
        return Group.objects.create(
            id=group.id,
            name=group.name,
            description=group.description,
            created_at=group.created_at,
        )

    def update(self, id, newGroup: Group) -> bool:
        try:
            Group.objects.filter(id=id).update(
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
            Group.objects.filter(id=id).delete()
            return True
        except ObjectDoesNotExist:
            return False

    def findById(self, id) -> Group:
        return Group.objects.get(id=id)

    def findAll() -> list[Group]:
        return Group.objects.all()
