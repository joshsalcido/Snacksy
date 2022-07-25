from flask import Blueprint, request
from app.models import db, Review

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<id>/delete', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()
