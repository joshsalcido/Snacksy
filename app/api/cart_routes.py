from flask import Blueprint, request, jsonify, session
from sqlalchemy.orm import joinedload
from app.models import db, ShoppingCart, Snack, items

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<id>', methods=['GET'])
def cart(id):
    cart = ShoppingCart.query.get(id)
    return cart.to_dict()


@cart_routes.route('/<id>', methods=['POST'])
def add_to_cart(id):
    data = request.json
    print('****THIS IS THE DATA', data)

    cart = ShoppingCart.query.get(id)
    db.session.execute(items.insert().values(
        shopping_cart_id=1, snack_id=data))
    db.session.commit()

    return cart.to_dict()
