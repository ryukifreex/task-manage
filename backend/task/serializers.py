from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = (
            "id",
            "title",
            "description",
            "status",
            "created_by",
            "assignee",
            "start_date",
            "end_date",
            "created_at",
            "updated_at",
        )
