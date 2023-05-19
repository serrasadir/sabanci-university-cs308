import { useContext } from "react";
import { Cart } from "../context/Context";
import { Link } from "react-router-dom";


function SaveDataToLocalStorage(data)
{
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('shop_cart')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value
    alert(a);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('shop_cart', JSON.stringify(a));
}




export const SingleProduct = ({prod}) => {

  

  const { state: { cart }, dispatch, } = useContext(Cart);


  return (
    <div>
    <div class="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1 min-h-80 lg:aspect-none group-hover:opacity-75 lg:h-80">
  <Link to={`/products/${prod.product_id}`}>
    <img src={prod.imageUrl} alt={prod.imageAlt} class="w-full h-full object-center object-cover lg:h-full lg:w-full" />
  </Link>
</div>

<div class="mt-4 flex justify-between">
  <div>
    <h3 class="text-left font-medium text-gray-700">
      <Link to={`/products/${prod.product_id}`}>{prod.product_name}</Link>
    </h3>
    <p class="mt-1 text-sm text-left text-gray-500">{prod.category}</p>
  </div>
  <p class="text-right font-medium text-gray-900">{prod.price} TL</p>
</div>

<div>
  {cart.some((p) => p.product_id === prod.product_id) ? (        
    <button onClick={() => {
      dispatch({
        type:"REMOVE_FROM_CART",
        payload:prod,
      });
    }} class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
      Remove From Cart 
    </button>
  ) : (
    prod.stock <= 0 ? (
      <button class="px-4 py-2 font-semibold text-gray-800 border border-gray-400 rounded cursor-not-allowed opacity-50 bg-white hover:bg-gray-100">
        No Stock
      </button>
    ) : prod.stock == 1 ? (
      <div class="flex items-center">
        <p class="text-sm">Only 1 left!</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <button onClick={() => {
          dispatch({
            type:"ADD_TO_CART",
            payload:prod,
          });
        }} class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ml-auto">
          Add to Cart 
        </button>
      </div>
    ) : (
      <div class="flex items-center">
      <p class="text-sm"> {prod.stock} left </p>
     
      <button onClick={() => {
        dispatch({
          type:"ADD_TO_CART",
          payload:prod,
        });
      }} class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Add to Cart 
      </button>
      </div>
    )
  )}
</div>
</div>
  
    
  )
}