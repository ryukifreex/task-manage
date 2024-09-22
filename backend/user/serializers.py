from rest_framework import serializers
from .models import CustomUser, Organization


class UserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ["organization", "email", "name", "is_active", "is_admin", "is_superuser"]


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"
