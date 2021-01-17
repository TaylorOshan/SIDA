from .db import db
from .tables import users


class Flows:
    @classmethod
    async def get(cls, id):
        query = f"SELECT origin, destination, count, id \
        FROM flow WHERE dataset_id = '{id}' and count > 10 \
        "

        return await db.fetch_all(query)

    @classmethod
    async def get_flows_from_point(cls, id, name):
        query = f"SELECT origin, destination, count, id, o_attr, d_attr, cost \
        FROM flow WHERE dataset_id = '{id}' and count > 50 and \
            (origin = '{name}' OR destination = '{name}') "

        return await db.fetch_all(query)


class Locations:
    @classmethod
    async def get(cls, id):

        query = f" \
            SELECT name, o_attr, d_attr, lat, lon, id \
            FROM location WHERE dataset_id = '{id}' \
            "
        return await db.fetch_all(query)

    @classmethod
    async def get_from_index(cls, id, start_index, limit=None):
        query = f" \
            SELECT name, o_attr, d_attr, lat, lon, id \
            FROM location \
            WHERE dataset_id = '{id}'' and id > {start_index} \
            ORDER BY id asc \
            "
        if limit:
            query = query + f"LIMIT {limit}"

        return await db.fetch_all(query)


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
