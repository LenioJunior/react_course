from app_entities import db
from flask import request, jsonify
from user import User, UserSchema, user_schema, users_schema


class UserController:

    def get(self, id):

        if not id:
            return jsonify({'message': 'The id must be provided!'}), 404

        entity = User.query.get(id)

        if entity:
            result = user_schema.dump(entity)
            return jsonify(result), 200
        else:
            return jsonify({
                'message': f'The user with id "{id}" don´t exist!'
            }), 404

    def get_all(self):
        try:
            entities = User.query.all()
            if entities:
                result = users_schema.dump(entities)
                return jsonify(result), 200

            return jsonify({'message': 'No users were found!'}), 204
        except Exception as e:
            return jsonify({'Error while getting all entities': str(e)}), 400

    def post(self):
        name = request.json['name']
        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        phone = request.json['phone']

        user = User(password, name, username, phone, email)

        try:
            db.session.add(user)
            db.session.commit()
            result = user_schema.dump(user)
            return jsonify(result), 201

        except Exception as e:
            return jsonify({
                'message': 'Unable to create the user!',
                'data': str(e)
            }), 500

    def update(self, id):
        db_user = User.query.get(id)

        if not db_user:
            return jsonify({'message': 'User not found!', 'data': {}}), 404

        db_user.password = request.json['password']
        db_user.name = request.json['name']
        db_user.username = request.json['username']
        db_user.email = request.json['email']
        db_user.phone = request.json['phone']

        try:
            db.session.commit()
            result = user_schema.dump(db_user)
            return jsonify(result), 204
        except Exception as e:
            return jsonify({
                'message': 'Unable to update the user!',
                'data': str(e)
            }), 500

    def delete(self, id):
        entity = User.query.get(id)

        if not entity:
            return jsonify({
                'message': f'Entity with id "{id}" don´t exist!',
                'data': {}
            }), 404

        try:
            db.session.delete(entity)
            db.session.commit()
            result = user_schema.dump(entity)
            return jsonify(result), 200
        except Exception as e:
            return jsonify({'message':
                            'Unable to delete!',
                            'data': str(e)
                            }), 500

    def user_by_email(self, email):
        filtered = User.query.filter_by(email=email)
        return filtered.first() if filtered else None
