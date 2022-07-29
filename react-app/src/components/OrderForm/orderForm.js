import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { thunkClearCart, thunkGetCart } from '../../store/cart';
import { useHistory } from 'react-router-dom';

const OrderForm = ({ closeOrderModal, total, totalItems }) => {

    const sessionUser = useSelector((state) => state.session?.user);

    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const history = useHistory()

    const dispatch = useDispatch()

    const handleOrder = async (e) => {
        e.preventDefault();
        await dispatch(thunkClearCart(cart))
        await dispatch(thunkGetCart(sessionUser.id))
        closeOrderModal()
        history.push('/')
        return alert('Order Placed!')
    }

    return (
        <form>
            <div>
                <p>Shipping order to: {sessionUser?.address}</p>
            </div>
            <fieldset>
                <legend>Select your payment method:</legend>
                <div>
                    <input type='radio' id='visa' name='payment' value='visa' />
                    <label htmlFor='visa'>Visa</label>
                </div>
                <div>
                    <input type='radio' id='mastercard' name='payment' value='mastercard' />
                    <label htmlFor='mastercard'>MasterCard</label>
                </div>
                <div>
                    <input type='radio' id='ae' name='payment' value='ae' />
                    <label htmlFor='ae'>American Express</label>
                </div>
            </fieldset>
            <p>Total Items: {totalItems}</p>
            <p>Order Total: ${total.toFixed(2)}</p>
            <button onClick={closeOrderModal}>Cancel Order</button>
            <button onClick={handleOrder}>Submit Order</button>
        </form>
    )
}

export default OrderForm
