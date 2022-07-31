import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkClearCart, thunkDeleteFromCart, thunkGetCart, thunkUpdateCart } from "../../store/cart";
import OrderForm from "../OrderForm/orderForm";
import './cart.css'

const Cart = () => {
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const snackQ = useSelector(state => state.shoppingCart?.snackQuantity)
    const snacks = useSelector(state => state.shoppingCart?.allsnacks);
    const userId = useSelector(state => state.session?.user?.id);
    const [quantity, setQuantity] = useState(snackQ)
    const [snackId, setSnackId] = useState(0)
    const [showOrderForm, setShowOrderForm] = useState(false)

    let total = 0
    let totalItems = 0

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetCart(userId))
    }, [dispatch]);


    return (
        <div className='cart'>
            <div className='cart-snacks'>
                {cart && !cart.quantity > 0 && (
                    <div className="empty-msg">
                        <h1>Your cart is empty</h1>
                    </div>
                )}
                {cart && cart.quantity > 0 && (
                    <div className="snacky">
                        <h2>{cart.quantity} snack(s) in your cart</h2>
                        {cart.snacks && cart.snacks.map(snack => (
                            <div key={snack.id} className='cart-snack'>
                                <div style={{ 'display': 'none' }}>
                                    {total += snack.price}
                                    {totalItems += 1}
                                </div>
                                <div className="snack-display">
                                    <img src={snack.cover_pic}></img>
                                    <div>
                                        <p>{snack.title}</p>
                                        <p>${(snack.price).toFixed(2)}</p>
                                        <button className='remove-cart-button' onClick={() => dispatch(thunkDeleteFromCart(cart, snack))}>Remove from cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="checkout">
                {cart && cart.quantity > 0 && (
                    <div className="checkout-form-area">
                        {/* <button onClick={() => dispatch(thunkClearCart(cart))}>Clear Cart</button> */}
                        <OrderForm total={total} totalItems={totalItems} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;
