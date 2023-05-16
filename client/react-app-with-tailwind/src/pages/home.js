
import { useContext, useState } from "react";
import { Cart } from "../context/Context";
import { Link } from "react-router-dom";
import { Filters } from "./Filters";
import { SingleProduct } from "./singleProduct";

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((product) => product.product_name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query))
};

export const Home = () => {

  

  const [query, setQuery] = useState("");

  const { state } = useContext(Cart);

  const { productState: {sort, searchQuery, clear_filters, cate}, productDispatch} = useContext(Cart);

  
  if(state.loading) {
    return <div>Loading...</div>
  }
  
  if (state.error)
  {
    return <div>Error: {state.error}</div>
  }

 
  const filteredItems = getFilteredItems(query.toLowerCase(), state.products);

  const transformProducts = () => {
    let sortedProducts = state.products;

    if (sort)  {
      if(sort == "normal")
      {
        return sortedProducts;
      }
      else {
        console.log(sort)
        console.log("3")
        sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
      }
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) => 
      (
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category.toLowerCase().includes(searchQuery.toLowerCase())) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (cate) {
      sortedProducts = sortedProducts.filter((product) => 
      product.category.toLowerCase().includes(cate.toLowerCase()))
    }
    

    return sortedProducts;
  };

  return ( 



<div className="bg-white">
<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
  <label>Search</label>
  <div className="mt-2">
  <input 
    type="text" 
    className="rounded-lg" 
    onChange={(e) => {
      productDispatch({
        type: "FILTER_BY_SEARCH",
        payload: e.target.value,
      });
    }} 
  />
</div>
  <Filters/>
  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {transformProducts().map((product) => (
       <SingleProduct prod={product} key={product.product_id} />
    ))}
  </div>
</div>
</div>
  );
};







