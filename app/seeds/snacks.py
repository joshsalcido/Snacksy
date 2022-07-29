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
    title="Pepperidge Farm Milk Chocolate Chip",
    description="Pepperidge Farm Montauk cookies are filled with chunks of rich and creamy milk chocolate to satisfy your most decadent cookie cravings. Soft and sweet, they're the perfect pairing with a glass of milk or to enjoy as an afternoon treat. For us, baking is more than a job. It's a real passion.",
    price=11.40,
    category="Baked Goods"
  )

  rxbar_protein_bar=Snack(
    user_id=1,
    cover_pic="https://m.media-amazon.com/images/I/61WvZOPTM0L._SX679_.jpg",
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

  hawaiian_chips=Snack(
    user_id=2,
    cover_pic="https://www.instacart.com/image-server/932x932/filters:fill(FFF,true):format(webp)/www.instacart.com/assets/domains/product-image/file/large_1d37707f-3385-4eef-b505-30c164c9ca0d.png",
    title="Hawaiian Sweet Maui Onion Chips",
    description="Discover a new world of flavor when you crunch into Hawaiian Kettle Style Potato Chips. These crispy, golden chips are cooked to perfection, then seasoned with just the right amount of sweet maui onion flavor. We have combined only the finest ingredients to create a unique chip that captures the freshness and authenticity of the islands. Open a bag of Hawaiian Kettle Style Potato Chips, and you'll imagine yourself sailing on the blue waters of the Pacific headed toward an island of tropical paradise.",
    price=3.79,
    category="Chips"
  )

  jalapeno_chips=Snack(
    user_id=3,
    cover_pic="https://images.albertsons-media.com/is/image/ABS/960025915?$ecom-pdp-desktop$&defaultImage=Not_Available&defaultImage=Not_Available",
    title="Jalapeno Kettle Potato Chips",
    description="Kettle Brand Jalapeno kettle chips start with a search for undisputed potato excellence. They have a zesty, south-of-the-border flavor that deliciously strike a perfect balance between potato-ness and the spicy-ness of jalapeno peppers. These chips are easy to eat with a satisfying burn that sneaks up on you and makes your tongue tingle. Pair these jalapeno chips with an ice-cold cerveza and then kick back with this festive, fiery flavor.",
    price=2.50,
    category="Chips"
  )

  pringles=Snack(
    user_id=2,
    cover_pic="https://images.albertsons-media.com/is/image/ABS/960326588?$ecom-pdp-desktop$&defaultImage=Not_Available&defaultImage=Not_Available",
    title="Pringles Sour Cream and Onion Crisps",
    description="The awesomeness of sour cream, onion and potato together can't be measured by modern science. We've decided it's simply a flavor combination nature intended and man perfected. We don't question it. We'll just keep making 'em, as long as you keep nomming 'em.",
    price=2.39,
    category="Chips"
  )

  cool_ranch_doritos=Snack(
    user_id=3,
    cover_pic="https://m.media-amazon.com/images/I/81-DyMXy6tL._SX679_PIbundle-64,TopRight,0,0_AA679SH20_.jpg",
    title="Doritos Cool Ranch Tortilla Chips",
    description="Now packed with even more Cool Ranch flavor DORITOS isn't just a chip. It's fuel for disruption — our flavors ignite adventure and inspire action.With every crunch, we aim to redefine culture and support those who are boldly themselves.",
    price=4.69,
    category="Chips"
  )

  twix=Snack(
    user_id=2,
    cover_pic="https://i5.walmartimages.com/asr/34c1cb63-7580-483b-991c-156197ef060f_1.296d81d6a60ef48ced65a00abad5cb61.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    title="Twix Caramel Chocolate Cookie Candy Bar",
    description="TWIX believes a little bit of joy makes a big difference to your day. Cloaked in delicious, flowing chocolate, every stick is a little different. And every bite delivers the perfect mix of gooey caramel and crunchy cookie. Stock your pantry with this six-pack of full size chocolate candy bars as a reward for a big to-do list. TWIX full size candy bars turn break time into bliss. Our tip: take your coffee with a TWIX! Amp up your midday recharge with every bite of crunchy cookies. We've got to say, a gift bag full of Twix is always a hit. Care packages with full size TWIX candy bars are guaranteed to spready joy to friends and family. There are endless ways to share and enjoy a moment with TWIX.",
    price=6.00,
    category="Candy"
  )

  jolly_ranchers=Snack(
    user_id=3,
    cover_pic="https://m.media-amazon.com/images/I/81bC8VDTGDL._SX679_.jpg",
    title="Jolly Ranchers",
    price=7.99,
    description="Long-lasting hard candy you can take with you on the go, to work, on snack breaks and back home again at the end of the day. Fruit-flavored hard candy individually wrapped for convenience and exceptional freshness to the last piece. Includes original fruity flavors like watermelon, green apple, cherry, grape and blue raspberry.",
    category="Candy"
  )

  red_vines=Snack(
    user_id=2,
    cover_pic="https://m.media-amazon.com/images/I/81UKMlod6ZS._SX679_.jpg",
    title="Red Vines Licorice",
    price=10.57,
    description="RED VINES soft & chewy licorice candy twists in classic Original Red flavor. Iconic knob-topped candy jar holds about 159 Twists and is resealable to keep your candy fresh. Made in small batches using artisan candy-making techniques and the same original recipe as the very first RED VINES. RED VINES Original Red Twists are always fat free, low sodium and Halal & Kosher certified.",
    category="Candy"
  )

  mm=Snack(
    user_id=3,
    cover_pic="https://images.albertsons-media.com/is/image/ABS/960080764?$ecom-pdp-desktop$&defaultImage=Not_Available&defaultImage=Not_Available",
    title="M&M'S Minis Milk Chocolates Tube",
    price=2.00,
    description="One of the world's favorite chocolate since 1941 - M&M'S Classic Milk Chocolate candies are made of irrestistable milk chocolate in a colorful candy shell.",
    category="Candy"
  )

  cinnamon_roll=Snack(
    user_id=2,
    cover_pic="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/132444.jpg",
    title="Fresh Baked Cinnamon Roll",
    price=2.50,
    description="Sweet baked dough filled with a cinnamon-sugar filling. Made with a rich dough leavened with yeast and sweetened cinnamon filling. Topped with cinnamon cheese frosting and sugar glaze.",
    category="Baked Goods"
  )


  db.session.add(ruffles)
  db.session.add(sour_patch_kids)
  db.session.add(choco_chip_cookie)
  db.session.add(rxbar_protein_bar)
  db.session.add(arizona_green_tea)
  db.session.add(hawaiian_chips)
  db.session.add(jalapeno_chips)
  db.session.add(pringles)
  db.session.add(cool_ranch_doritos)
  db.session.add(twix)
  db.session.add(jolly_ranchers)
  db.session.add(red_vines)
  db.session.add(mm)
  db.session.add(cinnamon_roll)


  db.session.commit()


def undo_snacks():
    db.session.execute('TRUNCATE snacks RESTART IDENTITY CASCADE;')
    db.session.commit()
