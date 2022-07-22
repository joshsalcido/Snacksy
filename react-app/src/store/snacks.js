const GET_ALL_SNACKS = 'snack/getAllSnacks';


export const actionGetAllSnacks = (snacks) => {
    return {
        type: GET_ALL_SNACKS,
        snacks
    }
}



export const thunkGetAllSnacks = () => async (dispatch) => {
    const response = await fetch('/api/snacks');

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllSnacks(data.snacks));
        return data.snacks;
    }
}


const initialState = {};

const snacksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SNACKS:
            let newState = {};
            action.snacks.forEach(snack => {
                newState[snack.id] = snack
            });
            return newState;
        default:
            return state;
    }
}


export default snacksReducer;
