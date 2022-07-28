const GET_SHOPPING_CART = 'cart/getCart';
const ADD_TO_CART = 'cart/addToCart';
const UPDATE_CART = 'cart/updateCart';
const DELETE_FROM_CART = 'cart/deleteFromCart';
const CLEAR_CART = 'cart/clearCart';

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

export const actionClearCart = (cart) => {
    return {
        type: CLEAR_CART,
        cart
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
        // const snackInfo = {snack: snack}
        // console.log('***********************THE BACKEND DATA', data," SSSSSNACK", snack,"QQQQ", quantity)
        dispatch(actionAddToCart(data, snack, quantity));
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
        dispatch(actionUpdateCart(data, snackId, quantity));
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
        const cartData = await response.json();
        dispatch(actionDeleteFromCart(cartData, snack));
        return cartData;
    } else {
        return await response.json()
    }
}

export const thunkClearCart = (cart) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cart.id}/clear`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionClearCart(data))
        return data;
    } else {
        return await response.json()
    }
}

const initialState = { allsnacks: [] };

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOPPING_CART:
            let cartState = { ...state };
            cartState[action.cart.id] = action.cart
            const getList = [...cartState.allsnacks]
            // action.cart.snacks.forEach(snack => {
            //     getList.push({ 'id': snack.id, "snacky": snack, "snackyQty": 1 })
            // })
            return { ...cartState, allsnacks: getList }

        case ADD_TO_CART:
            // console.log('**ACTION', action)
            let addState = { ...state };
            addState[action.cart.id] = action.cart
            const list = [...addState.allsnacks]
            list.push({ 'id': action.snack.id, "snacky": action.snack, "snackyQty": action.quantity })
            // addState["snackQuantity"] = action.quantity
            // console.log("++addSTate->", addState, "++++>", action.quantity)
            return { ...addState, allsnacks: list }

        case DELETE_FROM_CART:
            let deleteState = { ...state };
            deleteState[action.cart.id] = action.cart
            // console.log("++ACTION in DELETE+++", action)
            const newList = deleteState.allsnacks.filter(snack => snack.id !== action.snack.id)
            return { ...deleteState, allsnacks: newList }

        case UPDATE_CART:
            let updateState = { ...state };
            updateState[action.cart.id] = action.cart
            const updateList = [...updateState.allsnacks]
            const index = updateState.allsnacks.findIndex(snack => snack.id === action.snackId)
            // console.log("action.SNACKID", action.snackId)
            // console.log("##INDEX", index)
            // console.log("++UPDATESTATE++", updateList)
            updateList[index]['snackyQty'] = action.quantity
            return { ...updateState, allsnacks: updateList }

        case CLEAR_CART:
            let clearState = { ...state };
            clearState[action.cart.id] = action.cart
            let clearList = [...clearState.allsnacks]
            clearList = [];
            return { ...clearState, allsnacks: clearList }

        default:
            return state;
    }


}


export default cartReducer;
