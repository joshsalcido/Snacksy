import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { thunkGetAllSnacks } from "../../store/snacks";
import CategoriesPage from "../Categories";
import "./allSnacks.css"


const AllSnacks = () => {
    const snacks = useSelector(state => Object.values(state.allSnacks));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSnacks());
    }, [dispatch]);

    if (!snacks) return null

    return (
        <>
            <div >
                <ul className="categories">
                    <li className="category-list">
                        <Link to="/categories/Chips" id="category-link">
                            <img className="category-button"src="https://i.etsystatic.com/11465033/r/il/631e55/3928665791/il_340x270.3928665791_d0b5.jpg" />
                            <p id='category-bttn-name'>Chips</p>
                        </Link>
                    </li>
                    <li className="category-list">
                        <Link to="/categories/Candy">
                            <img className="category-button-candy"src="https://i.etsystatic.com/11465033/r/il/90f371/3963233212/il_794xN.3963233212_ib58.jpg" />
                            <p id='category-bttn-name'>Candy</p>
                        </Link>
                    </li>
                    <li className="category-list">
                        <Link to="/categories/Baked Goods">
                            <img className="category-button-candy"src="https://i.etsystatic.com/11465033/r/il/2062b1/3532352007/il_1140xN.3532352007_4a7r.jpg" />
                            <p id='category-bttn-name'>Baked Goods</p>
                        </Link>
                    </li>
                    <li className="category-list">
                        <Link to="/categories/Protein">
                            <img className="category-button-candy"src="https://i.etsystatic.com/11465033/r/il/aa3aa6/3963194926/il_794xN.3963194926_2a0t.jpg" />
                            <p id='category-bttn-name'>Protein</p>
                        </Link>
                    </li>
                    <li className="category-list">
                        <Link to="/categories/Beverage">
                            <img className="category-button-candy"src="https://i.etsystatic.com/11465033/r/il/6007c8/3808870767/il_1140xN.3808870767_29ot.jpg" />
                            <p id='category-bttn-name'>Beverages</p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="container">
            {snacks && snacks.map(snack => (
                <div key={snack.id} className='snack-card'>
                    <Link className="home-page-snack-card"to={`/snacks/${snack.id}`}>
                        <img id="snack-image"src={snack.cover_pic} alt="snackImg"></img>
                        <p>{snack.title}</p>
                        <p id='snack-price'>$ {snack.price.toFixed(2)}</p>
                    </Link>
                </div>
            ))}
            </div>
        </>
    )
}


export default AllSnacks;
