from celery import Celery


celery_app = Celery(
    "worker",
    backend="redis://redis:6379/0",
    broker="redis://redis:6379/0",
    ignore_result=False,
    task_ignore_result=False,
    include=["app.flows.flow_models"],  # tasks
)

#  celery_app.conf.task_routes = {"TASK": "QUE"}


celery_app.conf.update(task_track_started=True)
