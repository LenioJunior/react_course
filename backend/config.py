import os
import random
import string
from dotenv import load_dotenv

# Load environment variables from `.env` file
load_dotenv()

# Environment variables
DEBUG = os.getenv('DEBUG', 'False') == 'True'

DB_USER='root'
DB_PASSWORD='1234'
DB_HOST='localhost'
DB_PORT=3306
DB_NAME='react_course'
DEBUG=True

'mysql://username:password@localhost/db_name'
SQLALCHEMY_DATABASE_URI = f'mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'