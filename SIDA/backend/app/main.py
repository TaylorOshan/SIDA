import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db.db import db
from .db.models import User as ModelUser
from .db.schema import User as SchemaUser
from .routers.api import router


# from fastapi_sqlalchemy import DBSessionMiddleware


log = logging.getLogger(__name__)
app = FastAPI()

ORIGINS = [
    "http://localhost:3000",  # change in docker env
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])


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
