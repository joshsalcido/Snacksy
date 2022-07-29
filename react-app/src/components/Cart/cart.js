import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkClearCart, thunkDeleteFromCart, thunkGetCart, thunkUpdateCart } from "../../store/cart";
import OrderForm from "../OrderForm/orderForm";
import Modal from 'react-modal';

const Cart = () => {
    // const shopping_cart = useSelector(state => state.shoppingCart)
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const snackQ = useSelector(state => state.shoppingCart?.snackQuantity)

    const snacks = useSelector(state => state.shoppingCart?.allsnacks);


    const userId = useSelector(state => state.session?.user?.id);
    const [quantity, setQuantity] = useState(snackQ)
    const [snackId, setSnackId] = useState(0)
    const [showOrderForm, setShowOrderForm] = useState(false)
    // let snackies = []

    // const [snackies, setSnackies] = useState([])

    let total = 0
    let totalItems = 0
    let currentKey = ''

    Modal.setAppElement('body');

    const dispatch = useDispatch();



   // async function handleSubmit(e) {
        // console.log("@@@@SnackID@@@", snackId)
       // e.preventDefault();
       // await dispatch(thunkUpdateCart(cart, snackId, quantity))
        // localStorage.setItem('snacks', JSON.stringify(snacks))
        // setSnackies(JSON.parse(localStorage.getItem('snacks')))
      //  dispatch(thunkGetCart(userId, snackies))
    //    console.log("***AFTER SUBMIT", snackies)
   // }

    // useEffect(() => {
    //     localStorage.setItem('snacks', JSON.stringify(snacks))

    // }, [snackies]);

    useEffect(() => {
        // setSnackies(JSON.parse(window.sessionStorage.getItem('snacks')))

        // console.log('***SNACKIES', snackies)
        dispatch(thunkGetCart(userId, snackies))

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

    // if (!snacks) return null
    // if (!snackQ) return null

    return (
        <>
            <button onClick={() => dispatch(thunkClearCart(cart))}>Clear Cart</button>
            <div>
                {cart.snacks && cart.snacks.map(snack => (
                    // !(currentKey === snack.id) && (
                    <div key={snack.id}>
                        <div style={{ 'display': 'none' }}>
                            {total += snack.price}
                            {totalItems += 1}
                            {/* {currentKey = snack.id} */}
                        </div>
                        <div>
                            <img src={snack.cover_pic}></img>
                            <p>{snack.title}</p>
                            <p>Price: {snack.price}</p>
                            {/* <p>Quantity: {snack.snackyQty}</p> */}
                            <button onClick={() => dispatch(thunkDeleteFromCart(cart, snack))}>Remove from cart</button>
                            {/* <form onSubmit={handleSubmit}>
                                    <label>Qty</label>
                                    <select onChange={(e) => { setQuantity(parseInt(e.target.value)) }}
                                        value={quantity}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                    <button type="submit" onClick={() => { setSnackId(snack.id); dispatch(thunkUpdateCart(cart, snack.id, quantity)) }}>Update Quantity</button>
                                </form> */}
                        </div>
                    </div>
                    // )

                ))}
            </div>
            <div>
                {cart && cart.quantity > 0 && (
                    <>
                        <p>Cart Quantity: {totalItems}</p>
                        <p>Cart Total: {total}</p>
                        <button onClick={openOrderModal}>Place Order!</button>
                        <Modal isOpen={showOrderForm} style={styling}>
                            <OrderForm closeOrderModal={closeOrderModal} total={total} totalItems={totalItems} />
                        </Modal>
                    </>
                )}
                {cart && !cart.quantity && (
                    <p>No items here yet!</p>
                )}
            </div>
        </>
    )
}

export default Cart;
