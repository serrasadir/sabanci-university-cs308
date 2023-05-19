import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GetUserID } from '../hooks/useGetuserID';


export const Cargopage = () => {

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


 const handleSubmitPost = async (comment) => {
  try 
  {
       await axios.post("http://localhost:3001/comment/post_comment", comment);
       alert("your comment sent to product");
  }
  catch (err)
  {
    console.error(err);
  }
};


const deleteUser = async (userId) => {
  return await axios.delete(`http://localhost:3001/comment/${userId}`)
    .then((response) => {
      console.log(response.data);
      alert("Deleted")
    })
    .catch((error) => {
      console.error(error);
    });
};


const statusChange =  async (prodid, userid) => {
  return await axios.put(`http://localhost:3001/order/deliver/${prodid}/${userid}`)
  .then((response) => {
    console.log(response.data);
    alert("Changed to Delivered")
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
            { order2.status == "In-Transit" ? 
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
              DELIVER
            </button>
          </div>)
            :
          
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
              ALREADY DELIVERED
            </button>
          </div>)
            }
            
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
  )
}