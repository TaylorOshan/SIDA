from itertools import count
from typing import Text

import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

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
    sqlalchemy.Column("dataset", sqlalchemy.ForeignKey('dataset.id'), nullable=False),
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


class Flows:
    @classmethod
    async def get(cls, id):
        #query = db.session.query(flow).select().where(flow.dataset_id == id)
        #query = flow.select().where(flow.dataset_id == id)
        # results = await db.fetch_one(query)
        #query = flow.select().where(flow.c.dataset_id == id)
        query = f"SELECT flow.origin, flow.destination, flow.count, flow.id \
        FROM flow WHERE flow.dataset_id = {id} and flow.count > 10 \
        "
        # ORDER BY flow.count asc 
        print(query)
        results = await db.fetch_all(query)
        return results

    @classmethod
    async def get_flows_from_point(cls, id, name):
        query = f"SELECT flow.origin, flow.destination, flow.count, flow.id \
        FROM flow WHERE flow.dataset_id = {id} and flow.count > 50 and (flow.origin = '{name}' OR flow.destination = '{name}') " # 
        results = await db.fetch_all(query)
        return results


class Locations:
    @classmethod
    async def get(cls, id):
        #query = location.select().where(location.dataset == id)
        #results = await Session.query(location).filter_by(dataset=0).one()
        # query = location.select()
        # results = await db.fetch_all(query)
        #results = await db.fetch_one(query)
        #query = location.select(location.c.name).where(location.c.dataset == id)
        query = f" \
            SELECT name, inflows, outflows, lat, lon, id \
            FROM location WHERE location.dataset = {id} \
            "
        print(query)
        results = await db.fetch_all(query)
        return results

    @classmethod
    async def get_from_index(cls, id, start_index, limit=None):
        query = f" \
            SELECT name, inflows, outflows, lat, lon, id \
            FROM location \
            WHERE dataset = {id} and id > {start_index} \
            ORDER BY id asc \
            "
        if limit:
            query = query + f"LIMIT {limit}"
        results = await db.fetch_all(query)
        return results


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
   