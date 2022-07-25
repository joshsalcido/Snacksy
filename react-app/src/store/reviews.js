const GET_ALL_REVIEWS = 'review/getAllReviews'

export const actionGetAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
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

        default:
            return state;
    }
}


export default reviewsReducer;
