import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Search from "./search";

export  function SearchResults() {

  return (
    <div>
     
      <ul>
     
      <div className="bg-white">
     <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
       <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
         {results.map((product) => (
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
      </ul> 
      
    </div>
  );
}
export default SearchResults;