const GET_ALL_REVIEWS = 'review/getAllReviews'
const CREATE_REVIEW = 'review/createReview'

export const actionGetAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

export const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const thunkGetAllReviews = (id) => async dispatch => {
    const response = await fetch(`/api/snacks/${id}/reviews`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllReviews(data.reviews));
        return data.reviews;
    }
}

export const thunkCreateReview = (id, review) => async dispatch => {
    const response = await fetch(`/api/snacks/${id}/reviews/new`, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(review)
    })

    if(response.ok) {
        const data = await response.json();
        dispatch(actionCreateReview(data));
        return data;
    }
}



const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = {};
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState;

        case CREATE_REVIEW:
            newState[action.review.id] = action.review
            return newState

        default:
            return state;
    }
}


export default reviewsReducer;
