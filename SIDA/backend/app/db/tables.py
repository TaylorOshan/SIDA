import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base

from .db import metadata


Base = declarative_base()

dataset = sqlalchemy.Table(
    "dataset",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("subtitle", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("description", sqlalchemy.Text, nullable=False),
    sqlalchemy.Column("source", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("image_url", sqlalchemy.String, nullable=False),
)

flow = sqlalchemy.Table(
    "flow",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column(
        "dataset_id", sqlalchemy.ForeignKey("dataset.id"), nullable=False
    ),
    sqlalchemy.Column("origin", sqlalchemy.String(), nullable=False),
    sqlalchemy.Column("destination", sqlalchemy.String(), nullable=False),
    sqlalchemy.Column("count", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("cost", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("o_attr", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("d_attr", sqlalchemy.Integer, nullable=False),
)

location = sqlalchemy.Table(
    "location",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column(
        "dataset_id", sqlalchemy.ForeignKey("dataset.id"), nullable=False
    ),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("o_attr", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("d_attr", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("lat", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("lon", sqlalchemy.Float, nullable=False),
)