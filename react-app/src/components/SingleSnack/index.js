import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { thunkDeleteSnack, thunkGetSingleSnack } from '../../store/snacks';
import { useParams, useHistory, Link } from 'react-router-dom';
import Reviews from '../Reviews';

export default function SingleSnack() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { snackId } = useParams()


    const sessionUser = useSelector((state) => state.session.user);
    const snack = useSelector((state) => state.allSnacks[snackId]);

    useEffect(() => {
        dispatch(thunkGetSingleSnack(snackId))
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
            </div>
            <Reviews />
        </>
    )
}
