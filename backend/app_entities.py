from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

app = Flask(__name__)
ROOT_FLASK_DIR = app.root_path

app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object('config')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
Model = db.Model
ma = Marshmallow(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

CORS(app, supports_credentials=True, resources={r"*": {"origins": "*"}})

with app.app_context():
    pass
    # Entities must be imported to allow migrations to detect changes

    from user import User
    #db.reflect()
    db.create_all()