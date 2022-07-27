const GET_SHOPPING_CART = 'cart/getCart';
const ADD_TO_CART = 'cart/addToCart';

export const actionGetCart = (cart) => {
    return {
        type: GET_SHOPPING_CART,
        cart
    }
}

export const actionAddToCart = (snack) => {
    return {
        type: ADD_TO_CART,
        snack
    }
}


export const thunkGetCart = (id) => async (dispatch) => {
    const response = await fetch(`/api/cart/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetCart(data));
        return data;
    }
}

export const thunkAddToCart = (id, snack) => async (dispatch) => {
    console.log('**FROM THUNK', snack)
    const response = await fetch(`/api/cart/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snack)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionAddToCart(data));
        return data
    }
}


const initialState = {};

const cartReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SHOPPING_CART:
            let cartState = {};
            cartState[action.cart.id] = action.cart
            return cartState

        case ADD_TO_CART:
            console.log('**ACTION', action)
            let addState = { ...state, [action.snack.id]: action.snack };
            return addState
        default:
            return state;
    }


}


export default cartReducer;
