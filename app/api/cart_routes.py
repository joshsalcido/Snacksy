from flask import Blueprint, request, jsonify, session
from sqlalchemy.orm import joinedload
from app.models import db, ShoppingCart, Snack, items

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<id>', methods=['GET'])
def cart(id):
    cart = ShoppingCart.query.get(id)
    # snacks = cart.snacks
    # data = [snack.to_dict() for snack in snacks]
    print("**********HERE", cart.to_dict())
    return cart.to_dict()
