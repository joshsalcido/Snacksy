import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteFromCart, thunkGetCart } from "../../store/cart";


const Cart = () => {
    const shopping_cart = useSelector(state => state.shoppingCart)
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    // const snacks = cart.snacks
    const userId = useSelector(state => state.session.user.id);

    let total = 0

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCart(userId));
    }, [dispatch]);

    console.log('hi cart', cart)
    return (
        <>
            <div>
                {cart && cart.snacks.map(snack => (
                    <div key={snack.id}>
                        <div style={{ 'display': 'none' }}>
                            {total += snack.price}
                        </div>
                        <div>
                            <img src={snack.cover_pic}></img>
                            <p>{snack.title}</p>
                            <p>{snack.price}</p>
                            <button onClick={() => dispatch(thunkDeleteFromCart(cart, snack))}>Remove from cart</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <p>Total Price: {total}</p>
            </div>
        </>
    )
}

export default Cart;
