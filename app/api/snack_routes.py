from flask import Blueprint, request, jsonify
from app.models import db, Snack, Review, User

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


@snack_routes.route('/<id>')
def single_snack(id):
    snack = Snack.query.get(id)
    return snack.to_dict()

@snack_routes.route('/<id>/edit', methods=['PUT'])
def edit_snack(id):
    snack = Snack.query.get(id)
    data = request.json

    snack.user_id = data['user_id']
    snack.cover_pic = data['cover_pic']
    snack.title = data['title']
    snack.description = data['description']
    snack.price = data['price']
    snack.category = data['category']

    db.session.commit()
    return snack.to_dict()


@snack_routes.route('/<id>/delete', methods=['DELETE'])
def delete_snack(id):
     snack = Snack.query(User).get(id)
     db.session.delete(snack)
     db.session.commit()
     return snack.to_dict()

# ------- Reviews --------

@snack_routes.route('/<id>/reviews')
def get_reviews(id):
    snack = Snack.query.get(id)
    reviews = snack.reviews
    # reviews = db.session.query(Review, User).join(User).filter(Review.snack_id == id)
    # reviews = Review.query.join(User).filter(Review.snack_id == id).filter(User.id == Review.user_id)
    # reviews = Review.query.join(User).filter(Review.snack_id == id)
    data = [review.to_dict() for review in reviews]
    print(data)
    return {'reviews': data}


@snack_routes.route('/<id>/reviews/new', methods=['POST', "GET"])
def post_review(id):
    data = request.json
    new_review = Review (
        user_id=data['user_id'],
        snack_id= id,
        rating= data['rating'],
        comment= data['comment']
    )

    db.session.add(new_review)
    db.session.commit()


    return new_review.to_dict()
