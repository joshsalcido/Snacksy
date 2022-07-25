from .db import db


class CartItem(db.Model):
  __tablename__ = "cart_items"
  id = db.Column(db.Integer, primary_key=True)
  shopping_cart_id = db.Column(db.Integer, db.ForeignKey("shopping_carts.id"), nullable=False)
  snack_id = db.Column(db.Integer, db.ForeignKey("snacks.id"), nullable=False)
  quanity = db.Column(db.Integer, nullable=False)

  shopping_cart = db.relationship("ShoppingCart", back_populates="cart_items")
  snack = db.relationship("Snack", back_populates="cart_item")

  def to_dict(self):
        return {
            'id': self.id,
            'shopping_cart_id': self.shopping_cart_id,
            'snack_id': self.snack_id,
            'quanity': self.quanity
        }
