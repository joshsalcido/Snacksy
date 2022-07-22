import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSnacks } from "../../store/snacks";


const AllSnacks = () => {
    const snacks = useSelector(state => state.allSnacks.snacks);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllSnacks());
    }, [dispatch]);

    return (
        <div>
            {snacks && snacks.map(snack => (
                <div key={snack.id}>
                    <img src={snack.cover_pic}></img>
                    <p>{snack.title}</p>
                    <p>{snack.description}</p>
                    <p>{snack.price}</p>
                    <p>{snack.price}</p>
                </div>
            ))}
        </div>
    )
}


export default AllSnacks;
