# Generated by Django 4.2.15 on 2024-08-30 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('status', models.CharField(choices=[('not_started', '未着手'), ('in_progress', '処理中'), ('pending_review', '処理済み'), ('completed', '完了'), ('pending', '保留中')], default='not_started', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'タスク',
                'verbose_name_plural': 'タスク',
                'db_table': 'task',
            },
        ),
    ]