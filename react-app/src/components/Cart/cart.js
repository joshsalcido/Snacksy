import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../store/cart";


const Cart = () => {
    const cart = useSelector(state => state.shoppingCart)
    const snacks = useSelector(state => Object.values(state.shoppingCart)[0].snacks);
    // const snacks = cart.snacks
    const userId = useSelector(state => state.session.user.id);

    let total = 0

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCart(userId));
    }, [dispatch]);

    console.log('hi cart', snacks)
    return (
        <>
            <div>
                {snacks && snacks.map(snack => (
                    <div key={snack.id}>
                        <div style={{ 'display': 'none' }}>
                            {total += snack.price}
                        </div>
                        <div>
                            <img src={snack.cover_pic}></img>
                            <p>{snack.title}</p>
                            <p>{snack.price}</p>
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
