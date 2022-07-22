from app.models import db, Snack


def seed_snacks():
  ruffles = Snack(
    user_id =1,
    cover_pic="https://www.theimpulsivebuy.com/wordpress/wp-content/uploads/2022/02/rufflebron1.jpeg",
    title="Ruffles Flamin' Hot Cheddar & Sour Cream Potato Chips",
    description="A blend of rich, velvety cheddar with smooth, creamy sour cream flavor meets the classic hot & spicy Flamin' Hot flavor, A thicker, sturdier potato chip with Ruffles trademarked ridges. Ruffles is famous for two things: the ridges on our chips, the fact that we are the Official Chip of the NBA, and the best chip flavors the game has ever tasted. Okay, so maybe it is three things.",
    price= 5.99

  )
