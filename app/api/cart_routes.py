from flask import Blueprint, request, jsonify, session
from sqlalchemy.orm import joinedload
from app.models import db, ShoppingCart, Snack, items

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<id>', methods=['GET'])
def cart(id):
    cart = ShoppingCart.query.get(id)
    return cart.to_dict()
