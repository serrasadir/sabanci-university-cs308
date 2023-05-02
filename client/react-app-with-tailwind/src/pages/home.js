
import { useContext, useState } from "react";
import { Cart } from "../context/Context";
import { Link } from "react-router-dom";
import { Filters } from "./Filters";
import { SingleProduct } from "./singleProduct";

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((product) => product.product_name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
};

export const Home = () => {

  

  const [query, setQuery] = useState("");

  const { state } = useContext(Cart);

  
  if(state.loading) {
    return <div>Loading...</div>
  }
  
  if (state.error)
  {
    return <div>Error: {state.error}</div>
  }

  console.log(state);
 
  const filteredItems = getFilteredItems(query.toLowerCase(), state.products);

  return ( 



<div className="bg-white">
<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
  <div className="mt-10">
    <input type="text" onChange={(e) => setQuery(e.target.value)}/>
  </div>
  <Filters/>
  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {filteredItems.map((product) => (
       <SingleProduct prod={product} key={product.product_id} />
    ))}
  </div>
</div>
</div>
  );
};







