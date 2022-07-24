const GET_ALL_SNACKS = 'snack/getAllSnacks';

const POST_SNACK = 'snack/postSnack';


export const actionGetAllSnacks = (snacks) => {
    return {
        type: GET_ALL_SNACKS,
        snacks
    }
}

export const actionPostSnack = (snack) => {
    return {
        type: POST_SNACK,
        snack
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

export const thunkPostSnack = (snack) => async (dispatch) => {
    const response = await fetch('/api/snacks/new', {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(snack)
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(actionPostSnack(data.snack));
        return data.snack;
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

        case POST_SNACK:
            newState = {...state}
            newState[action.snack.id] = action.snack
            return newState

        default:
            return state;
    }
}


export default snacksReducer;
