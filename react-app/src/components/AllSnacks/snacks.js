import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { thunkGetCart } from "../../store/cart";
import { thunkGetAllSnacks } from "../../store/snacks";
import "./allSnacks.css"


const AllSnacks = () => {
    const snacks = useSelector(state => Object.values(state.allSnacks));
    const cart = useSelector(state => Object.values(state.shoppingCart)[0]);
    const userId = useSelector((state) => state.session?.user?.id)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSnacks());
        dispatch(thunkGetCart(userId))
    }, [dispatch]);

    if (!snacks) return null

    return (
        <div>
            {snacks && snacks.map(snack => (
                <div key={snack.id}>
                    <Link to={`/snacks/${snack.id}`}>
                        <img id="snack-image" src={snack.cover_pic} alt="snackImg"></img>
                    </Link>
                    <p>{snack.title}</p>
                    <p>{snack.description}</p>
                    <p>{snack.price}</p>
                </div>
            ))}
        </div>
    )
}


export default AllSnacks;
