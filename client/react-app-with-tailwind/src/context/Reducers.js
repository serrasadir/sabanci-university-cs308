const getLocalCartData = () => {
	let localCartData = localStorage.getItem("local_cart");
	if (localCartData === [])
	  {
	   return [];
	  }
	else
	 {
	   return JSON.parse(localCartData);
	 }  
  };

export const cartReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				products: action.payload,
                cart: getLocalCartData(),
				error: ''
			}
		case 'FETCH_ERROR':
			return {
				loading: false,
				products: [],
                cart: getLocalCartData(),
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

export const productReducer = (state, action) => {
	switch (action.type) {
	  case "SORT_BY_PRICE":
		    return { ...state, sort: action.payload };
	  case "FILTER_BY_SEARCH":
			return { ...state, searchQuery: action.payload };
	  case "SET_NORMAL":
			return { back_to: action.payload };
	  case "CLEAR_FILTERS":
			return { byRating: 0 };
	  case "t-shirt":
			return { ...state, cate: action.payload };
	  case "pants":
			return { ...state, cate: action.payload};
	  case "sweat":
			return { ...state, cate: action.payload };
	  default:
		return state;
	}
  };