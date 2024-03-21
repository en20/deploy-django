from api.adapters.outbound.database.models.user import User
from api.domain.repositories.IUserRepository import IUserRepository
from django.core.exceptions import ObjectDoesNotExist


# Concrete implementation for User Repository
class UserRepository(IUserRepository):
    def create(self, user: User) -> User:
        return User.objects.create(
            id=user.id,
            name=user.name,
            email=user.email,
            password=user.password,
            created_at=user.created_at,
            groups=user.groups,
        )

    def update(self, id, newUser: User) -> bool:
        try:
            User.objects.filter(id=id).update(
                id=newUser.id,
                name=newUser.name,
                email=newUser.email,
                password=newUser.password,
                created_at=newUser.created_at,
                groups=newUser.groups,
            )
            return True
        except ObjectDoesNotExist:
            return False

    def delete(self, id) -> bool:
        try:
            User.objects.filter(id=id).delete()
            return True
        except ObjectDoesNotExist:
            return False

    def findById(self, id) -> User:
        try:
            return User.objects.get(id=id)
        except ObjectDoesNotExist:
            return None

    def findAll(skip, limit) -> list[User]:
        return User.objects.all()[skip:limit]
