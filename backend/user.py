from __future__ import annotations

import uuid
from sqlalchemy import String, Column, UUID, Integer
from sqlalchemy.orm import mapped_column
from marshmallow import fields

from app_entities import ma, db


class User(db.Model):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    name = mapped_column(String(150), nullable=False)
    username = mapped_column(String(50), nullable=False)
    phone = mapped_column(String(70), nullable=True)
    email = mapped_column(String(70), unique=True, nullable=False)
    password = mapped_column(String(200), nullable=False)


    def __init__(self, password, name, username, phone, email):
        self.password = password
        self.name = name
        self.username = username
        self.phone = phone
        self.email = email

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email
        }


class UserSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()
    username = fields.String()
    phone = fields.String()
    email = fields.String()
    password = fields.String()

user_schema = UserSchema()
users_schema = UserSchema(many=True)
