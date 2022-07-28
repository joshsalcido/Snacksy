import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteFromCart, thunkGetCart, thunkUpdateCart } from "../../store/cart";
import OrderForm from "../OrderForm/orderForm";
import Modal from 'react-modal';

const Cart = () => {
    // const shopping_cart = useSelector(state => state.shoppingCart)
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const snackQ =  useSelector(state => state.shoppingCart.snackQuantity)
    console.log("###Finding Quantity #", snackQ)

    const userId = useSelector(state => state.session?.user?.id);
    const [quantity, setQuantity] = useState(snackQ)
    const [snackId, setSnackId] = useState(0)
    const [showOrderForm, setShowOrderForm] = useState(false)
    let total = 0

    Modal.setAppElement('body');

    const dispatch = useDispatch();

    async function handleSubmit(e) {
        // console.log("@@@@SnackID@@@", snackId)
        e.preventDefault();

        await dispatch(thunkUpdateCart(cart, snackId, quantity))

        // setQuantity(quantity)
    }

    useEffect(() => {
        dispatch(thunkGetCart(userId));
    }, [dispatch]);

    function openOrderModal() {
        setShowOrderForm(true)
    }

    function closeOrderModal() {
        setShowOrderForm(false)
    }

    const styling = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

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
                            <form onSubmit={handleSubmit}>
                                <label>Qty</label>
                                <select onChange={(e) => { setQuantity(parseInt(e.target.value)) }}
                                    value={quantity}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <button type="submit" onClick={() => setSnackId(snack.id)}>Update Quantity</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {cart && (
                    <p>Cart Quantity: {cart.quantity}</p>
                )}
                <p>Cart Total: {total}</p>
                <button onClick={openOrderModal}>Place Order!</button>
                <Modal isOpen={showOrderForm} style={styling}>
                    <OrderForm closeOrderModal={closeOrderModal} total={total} />
                </Modal>
            </div>
        </>
    )
}

export default Cart;
