# Generated by Django 4.2.15 on 2024-09-23 11:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0006_task_organization'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='assigned_to',
            new_name='assignee',
        ),
    ]