from app.models import db, ShoppingCart


def seed_carts():
    demo = ShoppingCart(
        user_id=1,
        total=0.00
    )

    db.session.add(demo)

    db.session.commit()


def undo_carts():
    db.session.execute('TRUNCATE shopping_carts RESTART IDENTITY CASCADE ')
    db.session.commit()
