import axios from "axios";
import { GetUserID } from "../hooks/useGetuserID";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Wishlist = () => {
    
        const [savedProducts, setSavedProducts] = useState([]);
        const userID = GetUserID();
     
        useEffect(() => {
          const fetchSavedProduct = async () => {
            try
            {
                const response = await axios.get(`http://localhost:3001/product/savedProducts/${userID}`);
                setSavedProducts(response.data.savedProducts);
            }
            catch (err)
            {
             console.error(err);
            }
           };
     
           fetchSavedProduct();
        }, []);
     
       return (
     
         <div className="bg-white">
           <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
             <h2 className="text-2xl font-bold tracking-tight text-gray-900">Wishlist</h2>
             <p>
               
             </p>
             <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
               {savedProducts.map((product) => (
                 <div key={product.id} className="group relative">
                   <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                     <img
                       src={product.imageUrl}
                       alt={product.imageAlt}
                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                     />
                   </div>
                   <div className="mt-4 flex justify-between">
                     <div>
                       <h3 className="text-left font-medium text-gray-700">
                         <Link to={`/products/${product.product_id}`}>{product.product_name}
                         <a>
                         <span aria-hidden="true" className="absolute inset-0" />

                         </a>                
                         </Link>
                       </h3>
                       <p className="text-left mt-1 text-sm text-gray-500">{product.category}</p>
                     </div>
                     <p className="text-right font-medium text-gray-900">{product.price} TL</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       )
}