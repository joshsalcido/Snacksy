from app.models import db, Review


def seed_reviews():
    review1=Review(
        user_id=1,
        snack_id=1,
        rating=5,
        comment="Best chips I have ever tasted. Shout out to Lebron James."
    )

    review2=Review(
        user_id=2,
        snack_id=1,
        rating=5,
        comment="This new flavor is fire."
    )

    review3=Review(
        user_id=1,
        snack_id=2,
        rating=4,
        comment="The best movie snack!!"
    )

    review4=Review(
        user_id=3,
        snack_id=2,
        rating=3,
        comment="Not too bad, but not the best"
    )

    review5=Review(
        user_id=1,
        snack_id=3,
        rating=5,
        comment="My go to cookies when I'm craving something sweet."
    )

    review6=Review(
        user_id=2,
        snack_id=3,
        rating=3,
        comment="These are good, but nothing beats my grandma's homemade cookies"
    )

    review7=Review(
        user_id=1,
        snack_id=4,
        rating=2,
        comment="Tastes a bit weird, but it does have a lot of protein."
    )

    review8=Review(
        user_id=3,
        snack_id=4,
        rating=4,
        comment="Go to protein bar after a workout."
    )

    review9=Review(
        user_id=1,
        snack_id=5,
        rating=5,
        comment="Since high school, this drink has been my absolute go to. It tastes amazing."
    )

    review10=Review(
        user_id=2,
        snack_id=5,
        rating=5,
        comment="Can't go wrong with some Arizona Green Tea!"
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
