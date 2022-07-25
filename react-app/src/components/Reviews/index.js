import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { thunkGetAllReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';

export default function Reviews() {
    const dispatch = useDispatch();
    const { snackId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector(state => Object.values(state.reviews));

    useEffect(() => {
        dispatch(thunkGetAllReviews(snackId))
    }, [dispatch, snackId])

    if (!reviews) return null

    return (
        <div className='reviews-container'>
            <h2 className='review-title'>Reviews</h2>
            {reviews.map(review => {
                return (
                    <div key={review.id}>
                        {/* <div>{review.User.first_name} {review.User.last_name}</div> */}
                        <div>{review.rating}</div>
                        <div>{review.comment}</div>
                    </div>
                )
            })}
        </div>

    )

}
