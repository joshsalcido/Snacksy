from flask import Blueprint, request
from app.models import db, Review

review_routes = Blueprint('reviews', __name__)
