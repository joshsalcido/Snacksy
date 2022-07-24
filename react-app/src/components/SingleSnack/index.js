import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { thunkEditSnack } from '../../store/snacks';
import { useParams } from 'react-router-dom';

export default function SingleSnack() {
    const dispatch = useDispatch();
    const { id } = useParams()

    const sessionUser = useSelector((state) => state.session.user);
    const snack = useSelector((state) => state.allSnacks[id]);

    useEffect(() => {
        dispatch(thunkEditSnack(id))
    }, [dispatch, id])

    if (!snack) return null

    return (
        <></>
    )
}
