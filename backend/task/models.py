from django.db import models
from django.contrib.auth import get_user_model
from user.models import Organization


class Task(models.Model):
    User = get_user_model()

    # ステータスリスト
    class Status(models.TextChoices):
        OPEN = "open"
        IN_PROGRESS = "in_progress"
        DONE = "done"
        CLOSED = "closed"
        PENDING = "pending"

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.OPEN)
    created_by = models.ForeignKey(
        User, null=True, on_delete=models.PROTECT, related_name="created_tasks"
    )
    assignee = models.ForeignKey(
        User, on_delete=models.PROTECT, null=True, blank=True, related_name="assigned_tasks"
    )
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    organization = models.ForeignKey(
        Organization,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "task"
        verbose_name = "タスク"
        verbose_name_plural = verbose_name
