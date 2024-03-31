from celery import Celery
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "autobots.settings")
app = Celery("autobots")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
