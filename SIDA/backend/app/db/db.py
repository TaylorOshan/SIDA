import os

from databases import Database
from dotenv import load_dotenv
import sqlalchemy


#  for local non docker
load_dotenv(
    os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
)

db = Database(os.environ["DATABASE_URL"])

metadata = sqlalchemy.MetaData()
