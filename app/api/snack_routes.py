from flask import Blueprint, request, jsonify
from app.models import db, Snack

snack_routes = Blueprint('snacks', __name__)

@snack_routes.route('/')
def snacks():
    snacks = Snack.query.all()
    data = [snack.to_dict() for snack in snacks]
    return {'snacks': data}


@snack_routes.route('/new', methods=['POST', 'GET'])
def create_snack():
    data = request.json

    new_snack = Snack(**data)

    db.session.add(new_snack)
    db.session.commit()
    return new_snack.to_dict()
