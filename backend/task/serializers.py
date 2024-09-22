from rest_framework import serializers
from .models import Task
from user.serializers import UserSerializer


class TaskSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = "__all__"
