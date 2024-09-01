from django.db import models


class Task(models.Model):
    class Status(models.TextChoices):
        NOT_STARTED = "not_started", "未着手"
        IN_PROGRESS = "in_progress", "処理中"
        PROCESSED = "processed", "処理済み"
        COMPLETED = "completed", "完了"
        PENDING = "pending", "保留中"

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NOT_STARTED
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "task"
        verbose_name = "タスク"
        verbose_name_plural = verbose_name
