from app.models import db, Snack


def seed_snacks():
  ruffles=Snack(
    user_id =1,
    cover_pic="https://www.theimpulsivebuy.com/wordpress/wp-content/uploads/2022/02/rufflebron1.jpeg",
    title="Flamin' Cheddar & Sour Cream",
    description="A blend of rich, velvety cheddar with smooth, creamy sour cream flavor meets the classic hot & spicy Flamin' Hot flavor, A thicker, sturdier potato chip with Ruffles trademarked ridges. Ruffles is famous for two things: the ridges on our chips, the fact that we are the Official Chip of the NBA, and the best chip flavors the game has ever tasted. Okay, so maybe it is three things.",
    price=5.99,
    category="Chips"
  )

  sour_patch_kids=Snack(
    user_id=1,
    cover_pic="https://i5.walmartimages.com/asr/1fdcb9a7-aa97-4a28-8326-399d8259c0c5.c20caad0737f4e5e3ca5041d818b8d47.jpeg",
    title="Sour Patch Kids",
    description="Sour Patch Kids are a tasty soft gummy candy with a coating of sour sugar, so the taste of the candy changes from sour to sweet. One of the driving forces behind Sour Patch Kids growth was its success in cinemas, and it became a staple for moviegoers in the U.S.",
    price=4.40,
    category="Candy"
  )

  choco_chip_cookie=Snack(
    user_id=1,
    cover_pic="https://m.media-amazon.com/images/I/71Yv87ycsrL._SL1500_.jpg",
    title="Pepperidge Farm Montauk Milk Chocolate Chip",
    description="Pepperidge Farm Montauk cookies are filled with chunks of rich and creamy milk chocolate to satisfy your most decadent cookie cravings. Soft and sweet, they're the perfect pairing with a glass of milk or to enjoy as an afternoon treat. For us, baking is more than a job. It's a real passion.",
    price=11.40,
    category="Baked Goods"
  )

  rxbar_protein_bar=Snack(
    user_id=1,
    cover_pic="https://m.media-amazon.com/images/I/71Yv87ycsrL._SL1500_.jpg",
    title="RXBAR, Chocolate Sea Salt, Protein Bar",
    description=" Our Chocolate Sea Salt RXBAR is the perfect protein bar for any brownie lover. Made with real food ingredients- 100% chocolate, egg whites for protein, dates to bind, nuts for texture. 12 gram of protein. 5 gram fiber. Gluten free. It is always the perfect time for a wholesome snack. That’s why we suggest trying this real food protein bar for breakfast time, lunch time, or as a pre or post workout snack. Eat the whole snack bar or save some for later.",
    price=11.40,
    category="Protein"
  )

  arizona_green_tea=Snack(
    user_id=1,
    cover_pic="https://m.media-amazon.com/images/I/41qizgqH1BL.jpg",
    title="Arizona Green Tea",
    description="Enjoy our 100% natural AriZona Green Tea iced or served up hot, with just the right amount of ginseng, honey and cane sugar. Reflect on all that goodness, delicious as ever. PREMIUM BREWED GREEN TEA FILTERED WATER, CANE SUGAR, HONEY, NATURAL FLAVOR, ASCORBIC ACID (VITAMIN C), CITRIC ACID, GINSENG EXTRACT.",
    price=0.99,
    category="Beverage"
  )

  db.session.add(ruffles)
  db.session.add(sour_patch_kids)
  db.session.add(choco_chip_cookie)
  db.session.add(rxbar_protein_bar)
  db.session.add(arizona_green_tea)

  db.session.commit()


def undo_snacks():
    db.session.execute('TRUNCATE snacks RESTART IDENTITY CASCADE;')
    db.session.commit()
