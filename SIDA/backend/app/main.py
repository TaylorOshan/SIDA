import logging
import os
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware

from .db.db import db
from .db.models import User as ModelUser
from .db.models import flow
from .db.schema import Flow
from .db.schema import User as SchemaUser
from .routers.v1 import router


log = logging.getLogger(__name__)
app = FastAPI()

ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001"  # change in docker env
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])
app.add_middleware(GZipMiddleware, minimum_size=500)

app.include_router(router)


@app.on_event("startup")
async def startup():
    await db.connect()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()


#  just used for testing and examples
@app.post("/user/")
async def create_user(user: SchemaUser):
    user_id = await ModelUser.create(**user.dict())
    return {"user_id": user_id}



@app.get("/user/{id}", response_model=SchemaUser)
async def get_user(id: int):
    user = await ModelUser.get(id)
    return SchemaUser(**user).dict()
