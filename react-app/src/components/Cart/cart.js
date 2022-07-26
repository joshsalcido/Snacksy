import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../store/cart";


const Cart = () => {
    const cart = useSelector(state => Object.values(state.shoppingCart));

    const userId = useSelector(state => state.session.user.id);
    console.log(userId, "%%%USERID")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCart(userId));
    }, [dispatch]);

    return (
        <div>
            {cart && (
                <div>
                    {console.log('hi', cart)}
                    {/* <img>{item.CartItem.id}</img> */}
                    {/* <p>{item.title}</p>
                    <p>{item.price}</p> */}
                </div>
            )}
            {/* {cart && (
                <div>
                    <p>{cart.getTotal()}</p>
                    <button>Place Order</button>
                </div>
            )} */}
        </div>
    )
}

export default Cart;
