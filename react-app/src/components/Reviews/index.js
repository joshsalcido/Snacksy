import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { thunkGetAllReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';
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
            <button onClick={openReviewForm}> Write a review</button>
            <Modal isOpen={showReviewForm} style={formStyles}>
                <ReviewForm setTrigger={setShowReviewForm}/>
                <button onClick={closeReviewForm}>Cancel</button>
            </Modal>
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
