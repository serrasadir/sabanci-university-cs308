import { useContext, useEffect, useState } from "react";
import { Cart } from "../context/Context"
import { GetUserID } from "../hooks/useGetuserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const Purchase = () => {

  const { state: { cart }, dispatch, } = useContext(Cart);

  const [total ,setTotal] = useState();
  
  const navigate = useNavigate()
  
  let a = []

  for (let i = 0; i < cart.length; i++) {
    a.push(cart[i]);
  }

  const userID = GetUserID();

  const [order2, setOrder] = useState({
    order: a,
    userID: userID,
    status: "Processing",
    total: cart.reduce((acc,curr) => acc + Number(curr.price), 0)
  });

  console.log("my order:",order2)

  const refreshPage = () => {
    window.location.reload(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try 
    {
         navigate("/payment_process")
    }
    
    catch (error)
    {
        console.error(error);
    }
};


const Back_To =  () => {
   return alert("You need to login or sign-up first!")
};


  useEffect(() => {
      setTotal(cart.reduce((acc,curr) => acc + Number(curr.price), 0));
  }, [cart])


  return (
    <div className="bg-gradient-to-r from-gray-100">
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 to-purple-100">
    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      Your Cart
    </h1>
    <div className="mt-4">
      {cart.length === 0 ? (
        <p className="text-lg text-gray-900">
          Your cart is empty. Start shopping now!
        </p>
      ) : (
       <div>
          <ul className="divide-y divide-gray-900">
            {cart.map((product) => (
              <li key={product.product_id} className="py-4 flex">
                <img
                  className="h-10 w-10 rounded-md object-cover"
                  src={product.imageUrl}
                  alt=""
                />
                <div className="ml-3">
                  <h2 className="text-sm font-medium text-gray-900">
                    {product.product_name}
                  </h2>
                  <p className="text-sm text-gray-500 text-left">
                    {product.color} | {product.size}
                  </p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <button
                      onClick= {()=>{dispatch({
                        type:"REMOVE_FROM_CART",
                        payload:product,
                      });
                       }}
                      className="inline-flex justify-between text-red-800 hover:text-gray-500"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price} TL
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <div className="text-base font-medium text-gray-900 flex justify-between">
              <p>Subtotal ({cart.length} items)</p>
              <p>{total} TL</p>
            </div>
            <p className="text-base font-medium text-gray-900 flex justify-between">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              {userID == null ? 
                          (
                            <button
                            href="#"
                            disabled={cart.length === 0}
                            onClick={Back_To}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </button>
                          )
                          :
                          (
                          <button
                            
                            href="/payment_success"
                            disabled={cart.length === 0}
                            onClick={handleSubmit}
                            className="flex items-center justify-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-button-blue"
                          >
                            Checkout
                          </button>
                          )
                      }
            </div>
        </div>
        </div>
  )
                    }
                    </div>
                    </div>
                    </div>
  )
}