<h1>Welcome to Snacksy!</h1>

<img src="https://i.postimg.cc/VkvM9qZQ/Screen-Shot-2022-07-31-at-12-22-34-AM.png"></img>

Snacksy is a clone of the popular ecommerce website, Etsy. On Snacksy, users can sign in or register, browse a variety of snacks, create snacks if they wish to sell items on Snacksy, add their favorite snacks to their cart and make an order, and also read and leave reviews for snacks.

[Live Link to Snacksy](https://snacksy.herokuapp.com/)

## Instructions on how to install and run Snacksy
After cloning Snacksy into your desired directory:
* In the root directory, run 'pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt' to install dependencies
* Cd into the 'react-app' directory and run 'npm install' to install dependencies
* In the root directory, and create an '.env' file based off of the example provided in the '.env.example' file
* To set up the database:
> * Run the command 'pipenv shell' to open the virtual environment
> * In the root directory, run 'flask db upgrade' to create the database
> * In the root directory, run 'flask db seed all' to add all models and seeders into your database
* To run the app in development mode: 
> * In one terminal, in the root directory run the command 'flask run'
> * In another terminal, cd into the frontend directory 'react-app' and run the command 'npm start'
> * With both terminals running, navigate to 'localhost:3000'. Congrats, you've successfully installed and ran Snacksy!

## View Snacksy's:
* [Feature List](https://github.com/joshsalcido/Snacksy/wiki/MVP-Feature-List)
* [React Components List](https://github.com/joshsalcido/Snacksy/wiki/React-Components)
* [Database Schema](https://github.com/joshsalcido/Snacksy/wiki/Database-Schema)
* [Frontend Routes](https://github.com/joshsalcido/Snacksy/wiki/Frontend-Routes)
* [API Routes](https://github.com/joshsalcido/Snacksy/wiki/API-Routes)
* [Redux Store Shape](https://github.com/joshsalcido/Snacksy/wiki/State-Shape)


## Technologies
Snacksy was built using the following technologies:
* **Backend: Flask**
* **Frontend: React/Redux and JavaScript/JSX**
* **Database: SQLAlchemy**
* **Design/Styling: HTML and CSS**
* **Hosting: Docker/Heroku**

## Key Features

### User Authentication

### Snacks (Create, Read, Update, Delete)

### Reviews (Create, Read, Update, Delete)

### Shopping Cart (Create, Read, Delete)

### Search

## Technical Details
The implementation of Snacksy's shopping cart was done by implementing a join table in which a many-to-many relationship between shopping carts and snacks was created. Adding to and deleting items from a shopping cart was then done thru adding and deleting rows in the join table and accessing the snacks through the shopping cart's to_dict method:
```
  @cart_routes.route('/<id>', methods=['POST'])
  def add_to_cart(id):
    data = request.json

    cart = ShoppingCart.query.get(id)
    db.session.execute(items.insert().values(
        shopping_cart_id=id, snack_id=data[0], quantity=data[1]))
    db.session.commit()
    return cart.to_dict()
```
```
    def getsnacked(self):
        data = [snack.to_dict() for snack in self.snacks]
        return data

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'snacks': self.getsnacked(),
            'cart_quantity': len(self.cart_items)
        }
```

## Future Improvements
* User profile page
* User ability to upgrade their snack quantities inside shopping cart
