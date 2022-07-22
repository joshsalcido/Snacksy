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
        const snacks = await response.json();
        dispatch(actionGetAllSnacks(snacks));
        return snacks;
    } else {
        return await response.json();
    }
}


const initialState = {};

const snacksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SNACKS:
            const allSnackState = { ...state };
            action.snacks.forEach(snack => {
                allSnackState[snack.id] = snack
            });
            return allSnackState;

        default:
            return state;
    }
}


export default snacksReducer;
