
export const cartReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				products: action.payload,
                cart: [],
				error: ''
			}
		case 'FETCH_ERROR':
			return {
				loading: false,
				products: [],
                cart: [],
				error: 'Something went wrong!'
			}
        case 'ADD_TO_CART':
			
            return {...state, cart: [...state.cart, {...action.payload, qty:1} ]};
			
        case 'REMOVE_FROM_CART':
			
            return {
                ...state, 
                cart: state.cart.filter((c) => c.product_id !== action.payload.product_id),
            };
		default:
			return state
	}
}