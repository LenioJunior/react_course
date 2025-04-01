from flask import Blueprint

from user_controller import UserController


def register_routes(app):
    app.register_blueprint(get_user_bp, url_prefix='/api')
    app.register_blueprint(get_users_bp, url_prefix='/api')
    app.register_blueprint(post_user_bp, url_prefix='/api')
    app.register_blueprint(put_user_bp, url_prefix='/api')
    app.register_blueprint(delete_user_bp, url_prefix='/api')

get_user_bp = Blueprint('get_user_bp', __name__)
get_users_bp = Blueprint('get_users_bp', __name__)
post_user_bp = Blueprint('post_user_bp', __name__)
put_user_bp = Blueprint('put_user_bp', __name__)
delete_user_bp = Blueprint('delete_user_bp', __name__)

user_controller = UserController()

@get_user_bp.route('/users/<id>', methods=['GET'])
def get_user(id):
    return user_controller.get(id)

@get_users_bp.route('/users', methods=['GET'])
def get_users():
    return user_controller.get_all()

@post_user_bp.route('/users', methods=['POST'])
def post_user():
    return user_controller.post()

@put_user_bp.route('/users/<id>', methods=['PUT'])
def update_user(id):
    return user_controller.update(id)

@delete_user_bp.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    return user_controller.delete(id)
