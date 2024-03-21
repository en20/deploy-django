# Generated by Django 5.0.3 on 2024-03-19 00:56

import api.adapters.outbound.database.models.utils
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Group",
            fields=[
                (
                    "id",
                    models.CharField(
                        default=api.adapters.outbound.database.models.utils.id_generator,
                        editable=False,
                        max_length=16,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("description", models.CharField(max_length=200)),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="created_at"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Robot",
            fields=[
                (
                    "id",
                    models.CharField(
                        default=api.adapters.outbound.database.models.utils.id_generator,
                        editable=False,
                        max_length=16,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("description", models.CharField(max_length=200)),
                ("section_name", models.CharField(max_length=50)),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="created_at"),
                ),
                (
                    "group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.group"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Run",
            fields=[
                (
                    "id",
                    models.CharField(
                        default=api.adapters.outbound.database.models.utils.id_generator,
                        editable=False,
                        max_length=16,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("task", models.CharField(max_length=50)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("PENDING", "pending"),
                            ("SUCCESS", "success"),
                            ("FAILURE", "failure"),
                        ],
                        default="PENDING",
                        max_length=10,
                    ),
                ),
                (
                    "started_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="started_at"),
                ),
                (
                    "robot",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.robot"
                    ),
                ),
            ],
        ),
    ]
