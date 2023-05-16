import React, { useReducer, useEffect, createContext, useState } from 'react'
import axios from 'axios'
import { cartReducer, productReducer } from '../context/Reducers'



const getLocalCartData = () => {
  let localCartData = localStorage.getItem("local_cart");

  if (!localCartData)
    return [];
  if (localCartData === [])
    {
     return [];
    }
  else
   {
     return JSON.parse(localCartData);
   }  
};


const initialState = {
	loading: true,
	error: '',
	product: [],
  cart: getLocalCartData(),
}


export const Cart = createContext();

const CartProvider = ({ children }) => {


    
    const [state,dispatch]=useReducer(cartReducer, initialState);

    // let [cart,SetCart] = useState([]);

    

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


   useEffect(() => {
    localStorage.setItem("local_cart", JSON.stringify(state.cart));
   }, [state.cart])

    /*const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: [],
      });*/

      const [productState, productDispatch] = useReducer(productReducer, {
        byRating: 0,
        searchQuery: "",
        cate: "",
        sort: "normal"
      });

  
    return (
      <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
        {children}
      </Cart.Provider>
    );
  }

  export default CartProvider;
  