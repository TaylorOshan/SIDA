from typing import Text

import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import PrimaryKeyConstraint

from .db import db
from .db import metadata


Base = declarative_base()

dataset = sqlalchemy.Table(
    "dataset",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("description", sqlalchemy.Text, nullable=False),
    sqlalchemy.Column("source", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("image_url", sqlalchemy.String, nullable=True),
)

flow = sqlalchemy.Table(
    "flow",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("dataset_id", sqlalchemy.ForeignKey('dataset.id'), nullable=False),
    sqlalchemy.Column("origin", sqlalchemy.String(), nullable=False),
    sqlalchemy.Column("destination", sqlalchemy.String(), nullable=False),
    sqlalchemy.Column("count", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("cost", sqlalchemy.Float, nullable=False),
)

location = sqlalchemy.Table(
    "location",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("dataset_id", sqlalchemy.ForeignKey('dataset.id'), nullable=False),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("inflows", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("outflows", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("lat", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("lon", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("population", sqlalchemy.Integer, nullable=False)  # pop?
)














#  declare table
users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("first_name", sqlalchemy.String),
    sqlalchemy.Column("last_name", sqlalchemy.String),
    sqlalchemy.Column("age", sqlalchemy.Integer),
)

#  then helper async classes


class User:
    @classmethod
    async def get(cls, id):
        query = users.select().where(users.c.id == id)
        user = await db.fetch_one(query)
        return user

    @classmethod
    async def create(cls, **user):
        query = users.insert().values(**user)
        user_id = await db.execute(query)
        return user_id
