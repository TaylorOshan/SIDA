from pydantic import BaseModel


#  this is for auto validation in routers
class User(BaseModel):
    first_name: str
    last_name: str = None
    age: int

    class Config:
        orm_mode = True


