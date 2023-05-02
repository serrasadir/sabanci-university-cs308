import React, { useReducer, useEffect, createContext } from 'react'
import axios from 'axios'
import { cartReducer, initializer } from '../context/Reducers'


const initialState = {
	loading: true,
	error: '',
	product: [],
  cart: []
}

export const Cart = createContext();

const CartProvider = ({ children }) => {

    
    const [state,dispatch]=useReducer(cartReducer, initialState);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get("http://localhost:3001/product/find");
          dispatch({type: "FETCH_SUCCESS", payload: response.data})
        } catch (err) {
          dispatch({type: "FETCH_ERROR", payload: err.message})
        }

      };
  
      fetchProduct();

    }, []);

    /*const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: [],
      });*/
  
    return (
      <Cart.Provider value={{ state, dispatch }}>
        {children}
      </Cart.Provider>
    );
  }

  export default CartProvider;
  