import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { thunkDeleteSnack, thunkGetSingleSnack } from '../../store/snacks';
import { thunkAddToCart } from '../../store/cart';
import { useParams, useHistory, Link } from 'react-router-dom';

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

        const ok = await dispatch(thunkAddToCart(cart, snack, quantity))

        if (ok) {
            setQuantity(quantity)
            return alert("Added to cart!")
        }
        return alert("Snack already in cart!")

    }

    useEffect(() => {
        dispatch(thunkGetSingleSnack(snackId))
        // dispatch(thunkGetCart(userId))
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
        if (cart.snacks) {
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
        <div className='container'>
            <div className='snackDetails'>
                <img src={snack.cover_pic} alt='snackImage'></img>
                <h1>{snack.title}</h1>
                <h2>{snack.category}</h2>
                <h2>${snack.price.toFixed(2)}</h2>
                <h3>{snack.description}</h3>
                {sessionUser && sessionUser.id === snack.user_id &&
                   <>
                    <Link to={`/snacks/${snack.id}/edit`}>
                        <button>Edit  <i className="fa-solid fa-pen-to-square"></i></button>
                    </Link>
                     <button onClick={onDelete}>Delete  <i className="fa-solid fa-trash-can"></i></button>
                   </>
                }
                <form onSubmit={handleSubmit}>
                    <label>Qty</label>
                    <select onChange={(e) => setQuantity(parseInt(e.target.value))}
                        value={quantity}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    {sessionUser && snack && !snacks.includes(JSON.stringify(snack)) && (
                        <button type="submit">Add to Cart</button>
                    )}
                </form>
                    {!sessionUser && (
                    <button className='nav-buttons' onClick={openLoginModal}>Add to Cart</button>
                    )}
                    <Modal isOpen={showLoginForm} style={formStyles}>
                        <LoginForm />
                        <button onClick={closeLoginModal}>Cancel</button>
                        <button  onClick={openClose}>Register</button>
                    </Modal>
                    <Modal isOpen={showSignupForm} style={formStyles}>
                        <SignUpForm setTrigger={setShowSignupForm}/>
                    </Modal>
                    {snack && snacks.includes(JSON.stringify(snack)) && (
                        <p>This snack is in your cart!</p>
                    )}
            </div>
        </div>
        <Reviews />
        </>
    )
}
