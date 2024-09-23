from rest_framework import serializers
from .models import Task
from user.serializers import UserSerializer


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = (
            "id",
            "title",
            "description",
            "status",
            "created_by",
            "assigned_to",
            "start_date",
            "end_date",
            "created_at",
            "updated_at",
        )
