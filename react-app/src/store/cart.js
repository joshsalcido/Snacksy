const GET_SHOPPING_CART = 'cart/getCart';
const ADD_TO_CART = 'cart/addToCart';
const UPDATE_CART = 'cart/updateCart';
const DELETE_FROM_CART = 'cart/deleteFromCart';

export const actionGetCart = (cart) => {
    return {
        type: GET_SHOPPING_CART,
        cart
    }
}

export const actionAddToCart = (cart, snack, quantity) => {
    return {
        type: ADD_TO_CART,
        cart, snack, quantity
    }
}

export const actionUpdateCart = (cart, snackId, quantity) => {
    return {
        type: UPDATE_CART,
        cart, snackId, quantity
    }
}

export const actionDeleteFromCart = (cart, snack) => {
    // console.log("***FROM ACTION", cart, snack)
    return {
        type: DELETE_FROM_CART,
        cart, snack
    }
}

export const thunkGetCart = (id) => async (dispatch) => {
    const response = await fetch(`/api/cart/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetCart(data));
        return data;
    } else {
        return await response.json()
    }
}

export const thunkAddToCart = (cart, snack, quantity) => async (dispatch) => {
    // console.log('**FROM THUNK', snack)
    const response = await fetch(`/api/cart/${cart.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([snack.id, quantity])
    });

    if (response.ok) {
        const data = await response.json();
        // console.log('**THE DATA', data)
        dispatch(actionAddToCart(data));
        return data
    } else {
        return await response.json()
    }
}

export const thunkUpdateCart = (cart, snackId, quantity) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cart.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify([snackId, quantity])
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionUpdateCart(data));
        return data;
    } else {
        return await response.json()
    }
}

export const thunkDeleteFromCart = (cart, snack) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cart.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(snack.id)
    });

    if (response.ok) {
        const snackId = await response.json();
        dispatch(actionDeleteFromCart(snackId));
        return snackId;
    } else {
        return await response.json()
    }
}

const initialState = {};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOPPING_CART:
            let cartState = { ...state };
            cartState[action.cart.id] = action.cart
            return cartState

        case ADD_TO_CART:
            // console.log('**ACTION', action)
            let addState = { ...state };
            addState[action.cart.id] = action.cart
            return addState

        case DELETE_FROM_CART:
            let deleteState = { ...state };
            deleteState[action.cart.id] = action.cart
            return deleteState

        case UPDATE_CART:
            let updateState = { ...state };
            updateState[action.cart.id] = action.cart
            return updateState

        default:
            return state;
    }


}


export default cartReducer;
