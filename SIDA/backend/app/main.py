import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware

from .routers.api import router


load_dotenv(os.path.join( 
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))), ".env"))
      
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


app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])


app.include_router(router)
