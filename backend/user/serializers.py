from rest_framework import serializers
from .models import CustomUser, Organization


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "organization",
            "email",
            "username",
            "first_name",
            "last_name",
            "is_active",
            "is_admin",
            "is_superuser",
        ]


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"