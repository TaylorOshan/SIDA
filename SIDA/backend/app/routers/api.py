from typing import Optional

from fastapi import APIRouter

from ..worker import celery_app


router = APIRouter()


@router.get("/celery/{word}")
async def word(word: str):

    task_name = "app.flows.flow_models.test_celery"

    celery_app.send_task(task_name, args=[word])

    return {"message": "Word received"}


@router.get("/layer")
def get_layer():
    locations = [
        {"id": 1, "name": "New York", "lat": 40.713543, "lon": -74.011219},
        {"id": 2, "name": "London", "lat": 51.507425, "lon": -0.127738},
        {"id": 3, "name": "Rio de Janeiro", "lat": -22.906241, "lon": -43.180244},
    ]
    flows = [
        {"origin": 1, "dest": 2, "count": 42},
        {"origin": 2, "dest": 1, "count": 51},
        {"origin": 3, "dest": 1, "count": 50},
        {"origin": 2, "dest": 3, "count": 40},
        {"origin": 1, "dest": 3, "count": 22},
        {"origin": 3, "dest": 2, "count": 42},
        {"origin": 1, "dest": 2, "count": 42},
        {"origin": 2, "dest": 1, "count": 51},
        {"origin": 3, "dest": 1, "count": 50},
        {"origin": 2, "dest": 3, "count": 40},
        {"origin": 1, "dest": 3, "count": 22},
        {"origin": 3, "dest": 2, "count": 42},
    ]

    return {"locations": locations, "flows": flows}
