from flask import Blueprint, request, jsonify, session
from sqlalchemy.orm import joinedload
from app.models import db, ShoppingCart

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<id>', methods=['GET'])
def cart(id):
    cart = ShoppingCart.query.join(ShoppingCart.cart_items).filter(
        ShoppingCart.user_id == id).one_or_none()

    print('******CART', cart.to_dict())
    return cart.to_dict()
