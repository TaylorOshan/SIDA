from .db import db


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
        FROM flow WHERE dataset_id = '{id}' and count > 10 and \
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


class Dataset:
    @classmethod
    async def get(cls, id):

        query = f" \
            SELECT name, description, subtitle, source, image_url, id \
            FROM dataset WHERE id = '{id}' \
            "
        return await db.fetch_all(query)

    @classmethod
    async def get_all(cls):
        query = " \
            SELECT name, description, subtitle, source, image_url, id \
            FROM dataset \
            ORDER BY name asc \
            "

        return await db.fetch_all(query)
