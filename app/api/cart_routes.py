from flask import Blueprint, request, jsonify, session
from sqlalchemy.orm import joinedload
from app.models import db, ShoppingCart, Snack, items

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<id>', methods=['GET'])
def cart(id):
    cart = ShoppingCart.query.select_from(items).join(Snack).filter(
        ShoppingCart.user_id == id).one_or_none()
    # cart = ShoppingCart.query.get(id)
    print("****", cart)
    return cart.to_dict()
