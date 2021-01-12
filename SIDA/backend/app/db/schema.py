
from pydantic import BaseModel


#  this is for auto validation in routers
class User(BaseModel):
    first_name: str
    last_name: str = None
    age: int

    class Config:
        orm_mode = True


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

