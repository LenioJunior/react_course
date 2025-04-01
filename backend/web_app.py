from app_entities import app
from routes import register_routes

# Constants for configuration
HOST = '0.0.0.0'
PORT = 5000
DEBUG_MODE = True


def main():
    # Register routes and run the app
    register_routes(app)
    app.run(host=HOST, port=PORT, debug=DEBUG_MODE)


if __name__ == '__main__':
    main()
