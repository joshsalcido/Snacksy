import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../store/cart";


const Cart = () => {
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    // const snacks = cart.snacks
    const userId = useSelector(state => state.session.user.id);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCart(userId));
    }, [dispatch]);

    console.log('hi cart', cart)
    return (
        <div>
            {cart && cart.snacks.map(snack => (
                <div>
                    <img src={snack.cover_pic}></img>
                    <p>{snack.title}</p>
                    <p>{snack.price}</p>
                </div>
            ))}
            {/* <div>{cart.getTotal()}</div> */}
        </div>
    )
}

export default Cart;
