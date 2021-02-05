import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from .db.db import db
from .routers.v1 import router


log = logging.getLogger(__name__)
app = FastAPI()
app.router.redirect_slashes = False

if "ORIGIN" not in os.environ:
    ORIGINS = ["*"]
else:
    BASE = os.environ["ORIGIN"]
    ORIGINS = [f"http://{BASE}", f"https://{BASE}"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware, minimum_size=500)

app.include_router(router)


@app.on_event("startup")
async def startup():
    await db.connect()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
