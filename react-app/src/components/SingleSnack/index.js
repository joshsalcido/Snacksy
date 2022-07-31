import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkDeleteSnack, thunkGetSingleSnack } from '../../store/snacks';
import { thunkAddToCart } from '../../store/cart';
import { useParams, useHistory, Link } from 'react-router-dom';
import { thunkGetCart } from '../../store/cart';

import Reviews from '../Reviews';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import Modal from 'react-modal';
import './SingleSnack.css'


export default function SingleSnack() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { snackId } = useParams();
    const [quantity, setQuantity] = useState(1);

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);



    const sessionUser = useSelector((state) => state.session.user);
    const snack = useSelector((state) => state.allSnacks[snackId]);
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const userId = useSelector((state) => state.session?.user?.id);
    const allsnacks = useSelector(state => state.shoppingCart.allsnacks);
    const [snackies, setSnackies] = useState([])
    // console.log('**CART!!!', cart)
    // console.log("***SNACK", snack)
    let snacks = []
    // console.log("***QUANTITY", quantity)



    async function handleSubmit(e) {
        e.preventDefault();

        if (cart) {
            const ok = await dispatch(thunkAddToCart(cart, snack, quantity))
            if (ok) {
                setQuantity(quantity)
                return alert("Added to cart!")
            }
            return alert("Snack already in cart!")
        }


    }

    useEffect(() => {
        dispatch(thunkGetSingleSnack(snackId))
        if (userId) {
            dispatch(thunkGetCart(userId))
        }
    }, [dispatch, snackId])

    const onDelete = () => {
        dispatch(thunkDeleteSnack(snackId))
        history.push('/')
    }
    function openLoginModal() {
        setShowLoginForm(true)
    }

    function closeLoginModal() {
        setShowLoginForm(false)
    }

    function openClose() {
        setShowSignupForm(true)
        closeLoginModal(true)
    }

    if (!snack) return null


    function stringify() {
        if (cart) {
            cart.snacks.forEach(item => {
                snacks.push(JSON.stringify(item))
            })
            return snacks
        }
    }

    const strgs = stringify(cart)
    // console.log(strgs)

    const formStyles = {
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
            <div className='single-snack-container'>
                <div className='img-div'>
                    <img className='single-img' src={snack.cover_pic} alt='snackImage'></img>
                    <div className='snack-info-div'>
                        <h1 className='single-title' >{snack.title}</h1>
                        <h2 className='single-cat'>{snack.category}</h2>
                        <h2 className='single-price'>${snack.price.toFixed(2)}</h2>
                        <h3 className='single-des'>{snack.description}</h3>
                        <form onSubmit={handleSubmit}>
                            {/* <label>Qty</label> */}
                            {/* <select onChange={(e) => setQuantity(parseInt(e.target.value))}
                            value={quantity}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select> */}
                            {sessionUser && snack && !snacks.includes(JSON.stringify(snack)) && (
                                <button className='addToCartbtn' type="submit">Add to Cart</button>
                                )}
                                {snack && snacks.includes(JSON.stringify(snack)) && (
                                    <p className='already-in-cart'>This snack is in your cart!</p>
                                    )}
                        </form>
                    </div>
                </div>
                    {sessionUser && sessionUser.id === snack.user_id &&
                        <>
                        <div className='edit-delete-div'>
                            <Link to={`/snacks/${snack.id}/edit`}>
                                <button className='edit-single-snack-btn'>Edit  <i className="fa-solid fa-pen-to-square"></i></button>
                            </Link>
                            <button className='delete-single-snack-btn' onClick={onDelete}>Delete  <i className="fa-solid fa-trash-can"></i></button>
                        </div>
                        </>
                    }
                    {!sessionUser && (
                        <button className='nav-buttons' onClick={openLoginModal}>Add to Cart</button>
                    )}
                    <Modal isOpen={showLoginForm} style={formStyles}>
                        <LoginForm />
                        <button onClick={closeLoginModal}>Cancel</button>
                        <button onClick={openClose}>Register</button>
                    </Modal>
                    <Modal isOpen={showSignupForm} style={formStyles}>
                        <SignUpForm setTrigger={setShowSignupForm} />
                    </Modal>
            </div>
            <Reviews />
        </>
    )
}
