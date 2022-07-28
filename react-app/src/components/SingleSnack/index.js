import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteSnack, thunkGetSingleSnack } from '../../store/snacks';
import { useParams, useHistory, Link } from 'react-router-dom';
import { thunkAddToCart, thunkGetCart } from '../../store/cart';

export default function SingleSnack() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { snackId } = useParams();
    const [quantity, setQuantity] = useState(1);


    const sessionUser = useSelector((state) => state.session.user);
    const snack = useSelector((state) => state.allSnacks[snackId]);
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const userId = useSelector((state) => state.session?.user?.id);
    console.log('**CART!!!', cart)
    console.log("***SNACK", snack)
    let snacks = []
    // console.log("***QUANTITY", quantity)


    async function handleSubmit(e) {
        e.preventDefault();

        const ok = await dispatch(thunkAddToCart(cart, snack, quantity))

        setQuantity(quantity)
        return alert("Added to cart!")

        // return alert("Snack already in cart!")

    }

    useEffect(() => {
        dispatch(thunkGetSingleSnack(snackId))
        dispatch(thunkGetCart(userId))
    }, [dispatch, snackId])

    const onDelete = () => {
        dispatch(thunkDeleteSnack(snackId))
        history.push('/')
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
                    {snack && !snacks.includes(JSON.stringify(snack)) && (
                        <button type="submit">Add to Cart</button>
                    )}
                    {snack && snacks.includes(JSON.stringify(snack)) && (
                        <p>This snack is in your cart!</p>
                    )}
                </form>
            </div>
        </>
    )
}
