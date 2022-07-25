from .db import db


class ShoppingCart(db.Model):
    __tablename__ = "shopping_carts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total = db.Column(db.Float, nullable=False)

    user = db.relationship("User", back_populates="shopping_cart")
    cart_items = db.relationship("CartItem", back_populates="shopping_cart")

    def __init__(self):
        self.shoppingList = []

    def addItem(self, item):
        self.shoppingList.append(item)

    def removeItem(self, item):
        self.shoppingList.remove(item)

    def getTotal(self):
        total = 0
        for item in self.shoppingList:
            name, price = item
            total = total + price
        return total

    def getShoppingList(self):
        items = None
        for item in self.shoppingList:
            items = items + item
        return items
        
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total': self.total
        }

