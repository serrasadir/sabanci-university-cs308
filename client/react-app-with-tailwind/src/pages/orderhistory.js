import { useEffect, useState } from "react";
import { GetUserID } from "../hooks/useGetuserID";
import axios from "axios";
import { useParams } from "react-router-dom";


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





export const OrderHistory = () => {

    const userID = GetUserID();

    const [order, setOrder] = useState([])

    const [ratedProducts, setRatedProducts] = useState([]);
    const [rating, setRating2] = useState(0);

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value);
    setRating2(value);
  };


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

    console.log(order)

     return (
        <div>
             <ul role="list" className="divide-y divide-gray-100">
                                {(order).map((o) => (
                                <li key={o._id} className="">
                                 <div className="flex gap-x-4">
                              
                                <div className="min-w-0 flex-auto place-content: start">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">{o.userID}</p>
                                  <p> ------------ </p>
                                  {(o.order).map((o_list) => (
                                    
                                    <div>
                                     <p>{o_list.product_name} </p>
                                     {o.status == "Delivered" ? 
                                     (<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                     <div className="mt-2 flex items-center">
                                       <span className="text-yellow-500">
                                         {[...Array(rating)].map((_, index) => (
                                           <svg
                                             key={index}
                                             className="h-4 w-4 fill-current"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20"
                                           >
                                             <path d="M19.968,7.52a.872.872,0,0,0-.672-.595L13.445,5.729,10.87.712a.863.863,0,0,0-1.592,0L6.555,5.729.7,6.926A.862.862,0,0,0,.2,8.764l4.8,4.665L4.236,18.56a.864.864,0,0,0,1.265.912L10,15.479l4.5,2.993a.863.863,0,0,0,1.265-.912l-.965-5.968,4.8-4.665A.866.866,0,0,0,19.968,7.52Z" />
                                           </svg>
                                         ))}
                                       </span>
                                       <span className="ml-2 text-gray-600">{rating} out of 5</span>
                                       <select className="ml-2 border border-gray-400 rounded p-1" value={rating} onChange={handleRatingChange}>
                                         <option value={0}>Select rating</option>
                                         <option value={1}>1 star</option>
                                         <option value={2}>2 stars</option>
                                         <option value={3}>3 stars</option>
                                         <option value={4}>4 stars</option>
                                         <option value={5}>5 stars</option>
                                       </select>
                                       <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                         onClick={() => rateProduct(rating, o_list._id)}>
                                             Rate
                                       </button>
                                       
                                     </div>
                                   </div>)
                                     :
                                     (<div></div>)}                  
            </div>
            
                                  ))}
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{o.status}</p>
                                </div>
                              </div>
                            </li>
                          ))}
             </ul>
        </div>
     )
}