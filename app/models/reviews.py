from .db import db


class Review(db.Model):
  __tablename__ = "reviews"
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  snack_id = db.Column(db.Integer, db.ForeignKey("snacks.id"), nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  comment = db.Column(db.String(500), nullable=True)

  user = db.relationship("User", back_populates="reviews")
  snack = db.relationship("Snack", back_populates="reviews")