from typing import Dict

from pydantic import BaseModel


class Location(BaseModel):
    id: int
    dataset: str
    name: str
    inflows: int
    outflows: int
    lat: float
    lon: float
    population: int

    class Config:
        orm_mode = True


class Dataset(BaseModel):
    id: str
    name: str
    description: str
    source: str
    image_url: str

    class Config:
        orm_mode = True


class Flow(BaseModel):
    id: int
    dataset_id: str
    origin: str
    destination: str
    count: int
    cost: float

    class Config:
        orm_mode = True


class attr(BaseModel):
    label: str
    val: int

    class Config:
        orm_mode = True


class EditedFlow(BaseModel):
    location_name: str
    edits: Dict[str, int]
    # o_attr: Optional[int] = None
    # d_attr: Optional[int] = None
