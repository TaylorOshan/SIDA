from typing import Optional

from fastapi import BackgroundTasks
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# from .worker.celery_app import celery_app


app = FastAPI()

origins = [
    "http://localhost:3000", #  change in docker env
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/layer")
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
    ]

    return {"locations": locations, "flows": flows}
