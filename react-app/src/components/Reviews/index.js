import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { thunkGetAllReviews, thunkDeleteReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import Modal from 'react-modal';
import ReviewForm from '../ReviewFormModal/ReviewForm';

export default function Reviews() {
    const dispatch = useDispatch();
    const { snackId } = useParams();
    const [showReviewForm, setShowReviewForm] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const reviews = useSelector(state => Object.values(state.reviews));

    Modal.setAppElement('body');

    function openReviewForm() {
        setShowReviewForm(true)
    }

    function closeReviewForm() {
        setShowReviewForm(false)
    }

    useEffect(() => {
        dispatch(thunkGetAllReviews(snackId))
    }, [dispatch, snackId])

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

    if (!reviews) return null

    return (
        <div className='reviews-container'>
            <h2 className='review-title'>Reviews</h2>
            {!reviews.length && (
                 <>
                    <h3>Be the first to leave a review</h3>
                 </>
                )}
            {sessionUser && (
            <>
                <button onClick={openReviewForm}> Write a review</button>
                <Modal isOpen={showReviewForm} style={formStyles}>
                    <ReviewForm setTrigger={setShowReviewForm}/>
                    <button onClick={closeReviewForm}>Cancel</button>
                </Modal>
            </>
            )}
            {reviews.map(review => {
                return (
                    <div key={review.id}>
                        {review.rating === 1 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                            </>
                            )}
                        {review.rating === 2 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                            </>
                            )}
                        {review.rating === 3 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#e4e5e9"/>
                                <FaStar color="#e4e5e9"/>
                            </>
                            )}
                        {review.rating === 4 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#e4e5e9"/>

                            </>
                            )}
                        {review.rating === 5 && (
                            <>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                                <FaStar color="#222"/>
                            </>
                            )}
                        <div>{review.comment}</div>
                        {/* <img src={`${review.user.profile_pic}`}></img> */}
                        <div>{review.user.first_name} {review.user.last_name}</div>
                        <div>
                        {sessionUser?.id === review.user_id && (
                            <button className='delete-review-button'
                                onClick={() => dispatch(thunkDeleteReview(review.id))}>
                                Delete review  <i className="fa-solid fa-delete-left"></i>
                            </button>
                        )}
                        </div>
                    </div>
                )
            })}
        </div>

    )

}
