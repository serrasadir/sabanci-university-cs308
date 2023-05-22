import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GetUserID } from '../hooks/useGetuserID';

export const Adminpage = () => {

  const userID = GetUserID();

  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [product, setProduct] = useState("");
  const [order, setOrder] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try 
      {
           const response = await axios.get("http://localhost:3001/comment/find");
           setComments(response.data);
           setUsername(response.data.user_name);
           setProduct(response.data.product_id_real);
      }
      catch (err)
      {
        console.error(err);
      }
    };

    const fetchOrders = async () => {
      try
      {
         const response = await axios.get("http://localhost:3001/order/find");
         setOrder(response.data);
      }
      catch (err)
      {
        console.error(err);
      }
    };

    fetchOrders();
    fetchComments();
 }, []);


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


  const handleSubmitPost = async (comment) => {
    try 
    {
         await axios.post("http://localhost:3001/comment/post_comment", comment);
         alert("your comment sent to product");
         return await axios.delete(`http://localhost:3001/comment/${comment._id}`)
      .then((response) => {
        console.log(response.data);
        alert("Deleted")
      })
      .catch((error) => {
        console.error(error);
      });
    }
    catch (err)
    {
      console.error(err);
    }
  };


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


const statusChange =  async (prodid, userid) => {


  return await axios.put(`http://localhost:3001/order/in_transit/${prodid}/${userid}`)
  .then((response) => {
    //console.log(response.data);
    alert("Changed status")
  })
  .catch((error) => {
    console.error(error);
  });
}

const Refund =  async (prodid, userid) => {


  return await axios.put(`http://localhost:3001/order/refund/${prodid}/${userid}`)
  .then((response) => {
    //console.log(response.data);
    sendEmail(userid)
    refreshPage();
  })
  .catch((error) => {
    console.error(error);
  });
  
}

const refreshPage = () => {
  window.location.reload(true);
}

 
const Cancel =  async (prodid, userid) => {


  return await axios.put(`http://localhost:3001/order/cancel/${prodid}/${userid}`)
  .then((response) => {
    //console.log(response.data);
    sendEmail(userid)
    refreshPage();
  })
  .catch((error) => {
    console.error(error);
  });
  
}


  return (
    <div className="bg-gray-800 container mx-auto my-10">
  <div className="bg-gray-800 grid grid-cols-1 gap-6 md:grid-cols-2">
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">ORDERS</h2>
      <ul className="divide-y divide-gray-200">
        {order.map((order2) => (
          <li key={order2._id} className="py-4">
            { order2.status == "Processing" ? 
            (<div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{order2.userID}</p>
              {order2.order.map((product) => (
                <div key={product._id} className="mt-1">
                  <p className="text-sm font-semibold text-gray-700">{product.product_name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
              ))}
            </div>
            <button 
            onClick={() => statusChange(order2._id, order2.userID)}
            className="bg-gray-800 rounded-md text-white font-semibold px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
              IN-TRANSIT
            </button>
          </div>)
          : order2.status == "Waiting For Cancel" ? 
          (<div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">{order2.userID}</p>
            {order2.order.map((product) => (
              <div key={product._id} className="mt-1">
                <p className="text-sm font-semibold text-gray-700">{product.product_name}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
            ))}
          </div>
          <button 
          onClick={() => Cancel(order2._id, order2.userID)}
          className="bg-gray-800 rounded-md text-white font-semibold px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
            {order2.status}
          </button>
        </div>)
            : order2.status == "Waiting For Refund" ? 
            (<div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{order2.userID}</p>
              {order2.order.map((product) => (
                <div key={product._id} className="mt-1">
                  <p className="text-sm font-semibold text-gray-700">{product.product_name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
              ))}
            </div>
            <button 
            onClick={() => Refund(order2._id, order2.userID)}
            className="bg-gray-800 rounded-md text-white font-semibold px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
              {order2.status}
            </button>
          </div>):
            (<div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{order2.userID}</p>
              {order2.order.map((product) => (
                <div key={product._id} className="mt-1">
                  <p className="text-sm font-semibold text-gray-700">{product.product_name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
              ))}
            </div>
            <button 
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
              ALREADY PROCESSED
            </button>
          </div>)}
          </li>
      ))}
      </ul>
    </div>
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">COMMENTS</h2>
      <ul className="divide-y divide-gray-200">
        {comments.map((comment) => (
          <li key={comment.user} className="py-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">{comment.user_name}</p>
                <p className="text-xs text-gray-500">{comment.product_id_real}</p>
                <p className="text-sm text-gray-700">{comment.comment}</p>
              </div>
              <div>
                <button 
                onClick = {() => handleSubmitPost(comment)}
                className="rounded-md bg-indigo-600 text-white font-semibold px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" onClick={() => handleSubmitPost(comment)}>
                  SEND
                </button>
                <button 
                onClick = {() => deleteUser(comment._id)}
                className="rounded-md bg-indigo-600 text-white font-semibold px-4 py-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" onClick={() => deleteUser(comment._id)}>
                  DELETE
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
  )
}