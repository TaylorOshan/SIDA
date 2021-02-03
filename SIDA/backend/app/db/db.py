import os

from databases import Database
from dotenv import load_dotenv
import sqlalchemy


#  for local non docker
# load_dotenv(
#     os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
# )

connection_string: str = ""

if "DATABASE_URL" in os.environ:
    connection_string = os.environ["DATABASE_URL"]
elif "RDS_HOSTNAME" in os.environ:
    USER = os.environ["RDS_USERNAME"]
    PASSWORD = os.environ["RDS_PASSWORD"]
    HOSTNAME = os.environ["RDS_HOSTNAME"]
    PORT = os.environ["RDS_PORT"]
    DB_NAME = os.environ["RDS_DB_NAME"]

    connection_string = f"postgresql://{USER}:{PASSWORD}@{HOSTNAME}:{PORT}/{DB_NAME}"
else:
    raise NameError("Define DB connection")

db = Database(connection_string)

metadata = sqlalchemy.MetaData()
