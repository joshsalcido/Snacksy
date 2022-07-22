from .db import db

class Snack(db.Model):
    __tablename__ = "snacks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cover_pic = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(20), nullable=False)

    users = db.relationship("User", back_populates="snack")
    cart_item = db.relationship("CartItem", uselist=False, back_populates="snack")
    reviews = db.relationship("Review", back_populates="snack")
