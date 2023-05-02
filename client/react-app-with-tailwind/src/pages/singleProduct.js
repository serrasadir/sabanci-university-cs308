import { useContext } from "react";
import { Cart } from "../context/Context";
import { Link } from "react-router-dom";


export const SingleProduct = ({prod}) => {

  

  const { state: { cart }, dispatch, } = useContext(Cart);

  console.log(cart);

  return (
            <div>
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Link to={`/products/${prod.product_id}`}>
                   <img
                  src={prod.imageUrl}
                  alt={prod.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                  </Link>
                
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-left font-medium text-gray-700">
                    
                    <Link to={`/products/${prod.product_id}`}>{prod.product_name}
                    </Link>
                    
                  </h3>
                  <p className="text-left mt-1 text-sm text-gray-500">{prod.category}</p>
                </div>
                <p className="text-right font-medium text-gray-900">{prod.price} TL</p>
              </div>
              <div >
          {cart.some((p) => p.product_id === prod.product_id)
          ? 
          (        
          <button onClick= {()=>{dispatch({
            type:"REMOVE_FROM_CART",
            payload:prod,
          });
           }}
          
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          > 
          Remove From Cart 
          </button>
           )
          :
          (
          
          <button onClick= {()=>{dispatch({
            type:"ADD_TO_CART",
            payload:prod,
          });
           }}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
             Add to Cart 
             </button>
          )
          }
         </div>
         
            </div>
          
    
  )
}