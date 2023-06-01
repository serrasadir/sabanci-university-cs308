import React, { useContext, useEffect, useState } from "react";
import { Cart } from "../context/Context";
import { Rating } from "./Rating";
import axios from "axios";

export const Filters = () => {
  const {
    productDispatch,
    productState: { sort, back_to, clear_filters, cate, sort_rating },
  } = useContext(Cart);

  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try 
    {
         const response = await axios.get("http://localhost:3001/category/find");
         setCategory(response.data);
         
    }
    catch (err)
    {
      console.error(err);
    }
  };

  useEffect(() => {
      
    fetchCategory();
    
  }, []);

  return (
    <div className="filters bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-medium mb-4">Filters and Sort Options</h2>
      <div className="mb-4">
        <h3 className="text-gray-800 font-medium">Sort by:</h3>
        <div className="flex items-center mt-2">
          <input
            id="highToLow"
            name="highToLow"
            type="checkbox"
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "highToLow",
              })
            }
            checked={sort === "highToLow" ? true : false}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="highToLow"
            className="text-gray-700 ml-2 cursor-pointer"
          >
            Price: High to Low
          </label>
        </div>
        <div className="flex items-center mt-2">
          <input
            id="lowToHigh"
            name="lowToHigh"
            type="checkbox"
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
              })
            }
            checked={sort === "lowToHigh" ? true : false}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="lowToHigh"
            className="text-gray-700 ml-2 cursor-pointer"
          >
            Price: Low to High
          </label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-gray-800 font-medium">Sort by Rating:</h3>
        <div className="flex items-center mt-2">
          <input
            id="ratingHighToLow"
            name="ratingHighToLow"
            type="checkbox"
            onChange={() =>
              productDispatch({
                type: "SORT_BY_RATING",
                payload: "highToLow",
              })
            }
            checked={sort_rating === "highToLow" ? true : false}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="ratingHighToLow"
            className="text-gray-700 ml-2 cursor-pointer"
          >
            Rating: High to Low
          </label>
        </div>
        <div className="flex items-center mt-2">
          <input
            id="ratingLowToHigh"
            name="ratingLowToHigh"
            type="checkbox"
            onChange={() =>
              productDispatch({
                type: "SORT_BY_RATING",
                payload: "lowToHigh",
              })
            }
            checked={sort_rating === "lowToHigh" ? true : false}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="ratingLowToHigh"
            className="text-gray-700 ml-2 cursor-pointer"
          >
            Rating: Low to High
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-gray-800 font-medium">Filter by category:</h3>
        {category.map((option) => (
                  <div className="flex items-center mt-2">
                  <input
                    id={option.category}
                    name={option.category}
                    type="checkbox"
                    onChange={() =>
                      productDispatch({
                        type: "category_choice",
                        payload: option.category,
                      })
                    }
                    checked={cate === option.category ? true : false}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="tshirt"
                    className="text-gray-700 ml-2 cursor-pointer"
                  >
                    {option.category}
                  </label>
                </div>        
          ))}

        
        
      </div>
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </button>
    </div>
  );
};


