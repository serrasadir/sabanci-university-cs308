import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Adminpage = () => {



  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [product, setProduct] = useState("");

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

    fetchComments();
 }, []);
 


  return (
    <ul role="list" className="divide-y divide-gray-100">
      {comments.map((comment) => (
        <li key={comment.user} className="flex justify-between gap-x-6 py-5">
          <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{comment.user_name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.product_id_real}</p>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{comment.comment}</p>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <button className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

