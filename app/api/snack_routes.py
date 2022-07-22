from flask import Blueprint, jsonify
from app.models import Snack

snack_routes = Blueprint('snacks', __name__)

@snack_routes.route('/')
def snacks():
    snacks = Snack.query.all()
    data = [snack.to_dict() for snack in snacks]
    return {'snacks': data}
