import os
from app_entities import app
from routes import register_routes
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration from environment variables
HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('API_PORT', '5000'))
DEBUG_MODE = os.getenv('DEBUG', 'False') == 'True'

register_routes(app)

# def main():
#     # Register routes and run the app
#     register_routes(app)
#     app.run(host=HOST, port=PORT, debug=DEBUG_MODE)


if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=DEBUG_MODE)
