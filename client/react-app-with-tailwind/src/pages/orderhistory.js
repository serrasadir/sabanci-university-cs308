import { useEffect, useState } from "react";
import { GetUserID } from "../hooks/useGetuserID";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import React from 'react';


const deleteUser = async (userId) => {
  return await axios.delete(`http://localhost:3001/comment/${userId}`)
    .then((response) => {
      //console.log(response.data);
      alert("Deleted")
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendEmail = async (userID) => {
  try 
  {
      const response = await axios.get(`http://localhost:3001/auth/mail/${userID}`);
  }
  catch (err)
  {
      console.error(err);
  }
};


export const OrderHistory = () => {

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedComment, setSelectedComment] = useState('');



  const handleOpenDropdown = (orderId) => {
    setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
    setSelectedRating(0);
    setSelectedComment('');
  };

  const handleRatingChange = (e) => {
    setSelectedRating(parseInt(e.target.value));
  };

  const handleCommentChange = (e) => {
    setSelectedComment(e.target.value);
  };

  const handleRateSubmit = (productId) => {
    // Submit the rating
    console.log(`Product ID: ${productId}, Rating: ${selectedRating}`);
  };

  const handleCommentSubmit = (productId) => {
    // Submit the comment
    console.log(`Product ID: ${productId}, Comment: ${selectedComment}`);
  };

    const userID = GetUserID();

    const [order, setOrder] = useState([])

    const [ratedProducts, setRatedProducts] = useState([]);
    const [rating, setRating2] = useState(0);



  /*const handleRatingChange = (event) => {
    const value = parseInt(event.target.value);
    setRating2(value);
  };*/


    useEffect(() => {


        const fetchData = async (userId) => {
            try 
            {
                const response = await axios.get(`http://localhost:3001/auth/order_history/${userId}`);
                setOrder(order => [...response.data.ordered]);
            }
            catch (err)
            {
                console.error(err);
            }
          };

         fetchData(userID);
    }, [userID])

    //console.log(order)
     
    const rateProduct = async (rating2, prodid) => {
      try 
      {
           const response = await axios.put("http://localhost:3001/product/rate", {      
           prodid,
           userID,
           rating2
      });
          setRatedProducts(response.data.ratedProducts);
          alert("Product Rated")
      }
      catch (err)
      {
        console.error(err);
      }
    };

    const refreshPage = () => {
      window.location.reload(true);
    }
    const refund = async (prodid, userid) => {
            return await axios.put(`http://localhost:3001/order/waitingrefund/${prodid}/${userid}`)
            .then((response) => {
              //console.log(response.data);
              //alert("Refund request sended")
              sendEmail(userid)
              refreshPage();
            })
            .catch((error) => {
              console.error(error);
            });

    }

    const Cancel = async (prodid, userid) => {
      return await axios.put(`http://localhost:3001/order/waitingcancel/${prodid}/${userid}`)
      .then((response) => {
        //console.log(response.data);
        //alert("Refund request sended")
        sendEmail(userid)
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
      });

}
    //console.log(order)

    return (
      <div className="py-4">
      <ul role="list" className="divide-y divide-gray-100">
        {order.map((o) => (
          <li key={o._id} className="py-4">
            <div>
              <p className="text-lg font-semibold leading-6 text-gray-900">Order ID: {o._id}</p>
              <p className="text-sm text-gray-500">{o.status}</p>
              <div>        
                   {o.status == "Delivered" ?
                   (<button
                    onClick={() => refund(o._id, o.userID)}
                    className="bg-gray-800 rounded-md text-white font-semibold px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                      Refund
                     </button>)
                     :
                     o.status == "Refunded"?
                     (<button 
                      className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                      Already Refunded </button>) 
                      :
                      o.status == "Waiting For Refund"?
                       (<button 
                        className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                        Waiting For Refund </button>) 
                     :
                     o.status == "Waiting For Cancel"?
                     (<button 
                      className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                      Waiting For Cancel</button>) 
                   :
                   o.status == "Canceled"?
                   (<button 
                    className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                    Already Canceled </button>) 
                   :
                     (<button
                      onClick={() => Cancel(o._id, o.userID)}
                      className="bg-gray-800 rounded-md text-white font-semibold px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                        Cancel the order
                       </button>)}
                   </div>
            </div>
            <div> 

            </div>
            <div className="mt-4">
              {o.order.map((o_list) => (
                <div key={o_list._id} className="relative">
                  <div
                    className="flex items-center justify-between py-2 border-b border-gray-200 cursor-pointer"
                    onClick={() => handleOpenDropdown(o_list._id)}
                  >
                    <div>
                      <p className="text-md font-medium text-gray-900">{o_list.product_name}</p>
                    </div>
                    {selectedOrderId === o_list._id ? (
                      <svg
                        className="h-5 w-5 fill-current text-gray-500 transform rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 14l6-6H4l6 6z" />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 fill-current text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 14l6-6H4l6 6z" />
                      </svg>
                    )}
                   </div>


                  {selectedOrderId === o_list._id && o.status === 'Delivered' && (
                    <div className="bg-gray-100 px-4 py-2 mt-2">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(selectedRating)].map((_, index) => (
                            <svg
                              key={index}
                              className="h-5 w-5 fill-current text-yellow-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M19.968,7.52a.872.872,0,0,0-.672-.595L13.445,5.729,10.87.712a.863.863,0,0,0-1.592,0L6.555,5.729.7,6.926A.862.862,0,0,0,.2,8.764l4.8,4.665L4.236,18.56a.864.864,0,0,0,1.265.912L10,15.479l4.5,2.993a.863.863,0,0,0,1.265-.912l-.965-5.968,4.8-4.665A.866.866,0,0,0,19.968,7.52Z" />
                            </svg>
                          ))}
                        </div>
                        <select
                          className="ml-2 border border-gray-400 rounded p-1 text-sm text-gray-600"
                          value={selectedRating}
                          onChange={handleRatingChange}
                        >
                          <option value={0}>Select rating</option>
                          <option value={1}>1 star</option>
                          <option value={2}>2 stars</option>
                          <option value={3}>3 stars</option>
                          <option value={4}>4 stars</option>
                          <option value={5}>5 stars</option>
                        </select>
                      </div>
                      <button
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded"
                        onClick={() => handleRateSubmit(o_list._id)}
                      >
                        Rate
                      </button>
                      <div className="mt-4">
                        <textarea
                          className="border border-gray-400 rounded p-1 text-sm text-gray-600"
                          placeholder="Enter your comment"
                          value={selectedComment}
                          onChange={handleCommentChange}
                        />
                        <button
                          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded"
                          onClick={() => handleCommentSubmit(o_list._id)}
                        >
                          Send Comment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
    );
}