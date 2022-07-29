import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { thunkGetAllSnacks } from "../../store/snacks";
import { thunkGetCart } from "../../store/cart";
import "./allSnacks.css"


const AllSnacks = () => {
    const snacks = useSelector(state => Object.values(state.allSnacks));

    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const userId = useSelector((state) => state.session?.user?.id)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSnacks());
        if (userId) {
            dispatch(thunkGetCart(userId))
        }
    }, [dispatch]);

    if (!snacks) return null
    // if (!userId) return null

    return (
        <div className="container">
            {snacks && snacks.map(snack => (
                <div key={snack.id} className='snack-card'>
                    <Link to={`/snacks/${snack.id}`}>
                        <img id="snack-image" src={snack.cover_pic} alt="snackImg"></img>
                    </Link>
                    <p>{snack.title}</p>
                    <p id='snack-price'>$ {snack.price.toFixed(2)}</p>
                </div>
            ))}
        </div>
    )
}


export default AllSnacks;
