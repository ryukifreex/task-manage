from rest_framework.permissions import BasePermission


class IsAdminOrSuperuser(BasePermission):
    def is_admin(self, request, view):
        return request.user.is_admin or request.user.is_superuser


class IsSuperuser(BasePermission):
    def is_superuser(self, request):
        return request.user.is_superuser
