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
      <p className="text-left italic text-sm text-gray-500">{prod.stock} left!</p>
      <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1 min-h-80 lg:aspect-none group-hover:opacity-75 lg:h-85">
        
        <Link to={`/products/${prod.product_id}`}>
          {prod.discount ? (
            <span className="flex px-2 py-1 text-xs text-red-600 font-bold mr-3">
              %{prod.discount_rate} Discount, Shop now!
            </span>
          ) : null}
          
          <img src={prod.imageUrl} alt={prod.imageAlt} class="w-full h-full object-center object-cover lg:h-full lg:w-full" />
        </Link>
      </div>
  
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-left font-medium text-gray-700">
            <Link to={`/products/${prod.product_id}`}>{prod.product_name}</Link>
          </h3>
          <p className="mt-1 text-sm text-left text-gray-500">{prod.category}</p>
        </div>
  
        {prod.discount ? (
          <div>
            <p style={{ textDecoration: 'line-through' }} className="text-right font-medium text-gray-900">
              {prod.old_price} TL
            </p>
            <div className="flex justify-between">
              <p className="text-right font-medium text-gray-900">{prod.price} TL</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-right font-medium text-gray-900">{prod.price} TL</p>
          </div>
        )}
      </div>
  
      <div>
        {cart.some((p) => p.product_id === prod.product_id) ? (
          <div className="flex justify-end">
            <button
              onClick={() => {
                dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: prod,
                });
              }}
              className="px-4 py-2 font-bold text-red-500 bg-white rounded hover:bg-white"
            >
              Remove From Cart
            </button>
          </div>
        ) : (
          prod.stock <= 0 ? (
            <button className="px-4 py-2 font-semibold text-gray-800 border border-gray-400 rounded cursor-not-allowed opacity-50 bg-white hover:bg-gray-100">
              No Stock
            </button>
          ) : prod.stock === 1 ? (
            <div className="flex items-center">
              <p className="text-left italic text-sm text-gray-500">Only 1 left!</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    dispatch({
                      type: 'ADD_TO_CART',
                      payload: prod,
                    });
                  }}
                  className="text-right px-4 py-2 font-bold text-blue-700 bg-white rounded hover:bg-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">

                <button
                  onClick={() => {
                    dispatch({
                      type: 'ADD_TO_CART',
                      payload: prod,
                    });
                  }}
                  className="text-right px-4 py-2 font-bold text-blue-700 bg-white rounded hover:bg-white"
                >
                  Add to Cart
                </button>
              </div>
           
          )
        )}
      </div>
    </div>
  );
                };