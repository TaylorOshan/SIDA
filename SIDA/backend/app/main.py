import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers.api import router


log = logging.getLogger(__name__)
app = FastAPI()

origins = [
    "http://localhost:3000",  # change in docker env
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
