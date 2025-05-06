import os
from dotenv import load_dotenv

# Load environment variables from `.env` file
load_dotenv()

# Environment variables
DEBUG = os.getenv('DEBUG', 'False') == 'True'

DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1234')
DB_HOST = os.getenv('DB_HOST', 'mysql-react-01')
DB_PORT = int(os.getenv('DB_PORT', '3306'))
DB_NAME = os.getenv('DB_NAME', 'react_course')

# 'mysql://username:password@localhost/db_name'
SQLALCHEMY_DATABASE_URI = (
    f'mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
)
