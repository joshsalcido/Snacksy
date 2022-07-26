from flask import Blueprint, request, jsonify, session
from sqlalchemy.orm import joinedload
from app.models import db, ShoppingCart, Snack

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<id>', methods=['GET'])
def cart(id):
    # cart = ShoppingCart.query.join(
    # CartItem, CartItem.shopping_cart_id == ShoppingCart.id).join(Snack, CartItem.snack_id == Snack.id).filter(ShoppingCart.user_id == id).one_or_none()
    cart = ShoppingCart.query.find(id)
    print('******CART', cart.to_dict())
    return cart.to_dict()
