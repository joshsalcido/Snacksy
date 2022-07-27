import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteSnack, thunkGetSingleSnack } from '../../store/snacks';
import { useParams, useHistory, Link } from 'react-router-dom';
import { thunkAddToCart, thunkGetCart } from '../../store/cart';

export default function SingleSnack() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { snackId } = useParams()


    const sessionUser = useSelector((state) => state.session.user);
    const snack = useSelector((state) => state.allSnacks[snackId]);
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const userId = useSelector((state) => state.session.user.id)
    console.log('**CART', cart)

    useEffect(() => {
        dispatch(thunkGetSingleSnack(snackId))
        dispatch(thunkGetCart(userId))
    }, [dispatch, snackId])

    const onDelete = () => {
        dispatch(thunkDeleteSnack(snackId))
        history.push('/')
    }

    if (!snack) return null

    return (
        <>
            <div className='snackDetails'>
                <img src={snack.cover_pic} alt='snackImage'></img>
                <h1>{snack.title}</h1>
                <h2>{snack.category}</h2>
                <h2>{snack.price}</h2>
                <h3>{snack.description}</h3>
                {sessionUser && sessionUser.id === snack.user_id &&
                    <>
                        <Link to={`/snacks/${snack.id}/edit`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={onDelete}>Delete</button>
                    </>
                }
                <button onClick={() => { dispatch(thunkAddToCart(cart.id, snack)) }}>Add to Cart</button>
            </div>
        </>
    )
}
