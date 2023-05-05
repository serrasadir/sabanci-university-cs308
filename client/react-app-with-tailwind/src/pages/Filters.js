import { useContext, useState } from "react";
import { Rating } from "./Rating";
import { Cart } from "../context/Context";



export const Filters = () => {
     
     const [rate, setRate] = useState(3);

     const {state: {products}} = useContext(Cart)

     const {
      productDispatch,
      productState: { sort, back_to, cate},
    } = useContext(Cart);


    return (
      <div className="filters flex flex-wrap items-center justify-between border-b border-gray-300 py-4 px-6">
      <div className="flex flex-col">
        <span className="title font-medium text-gray-900 mb-2">Sort by:</span>
        <div className="flex gap-x-3">
          <div className="flex items-center">
            <input
              id="comments"
              name="comments"
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
            <label htmlFor="comments" className="font-medium text-gray-900 ml-2 cursor-pointer">
              Price: High to Low
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="Ascending"
              name="Ascending"
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
            <label htmlFor="Ascending" className="font-medium text-gray-900 ml-2 cursor-pointer">
              Price: Low to High
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="title font-medium text-gray-900 mb-2">Filter by category:</span>
        <div className="flex gap-x-3">
          <div className="flex items-center">
            <input
              id="tshirt"
              name="tshirt"
              type="checkbox"
              onChange={() =>
                productDispatch({
                  type: "t-shirt",
                  payload: "T-shirt",
                })
              }
              checked={cate === "T-shirt" ? true : false}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="tshirt" className="font-medium text-gray-900 ml-2 cursor-pointer">
              T-Shirt
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="pants"
              name="pants"
              type="checkbox"
              onChange={() =>
                productDispatch({
                  type: "pants",
                  payload: "Pants",
                })
              }
              checked={cate === "Pants" ? true : false}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="pants" className="font-medium text-gray-900 ml-2 cursor-pointer">
              Pants
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="sweat"
              name="sweat"
              type="checkbox"
              onChange={() =>
                productDispatch({
                  type: "sweat",
                  payload: "Sweatshirt",
                })
              }
              checked={cate === "Sweatshirt" ? true : false}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="Ascending" className="font-medium text-gray-900">
                          Sweatshirt
                        </label>
                        <p className="text-gray-500"></p>
                      </div>
                      </div>
                      <button
            variant="light"
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() =>
              productDispatch({
                type: "CLEAR_FILTERS",
              })
            }
          >
            Clear Filters
          </button>
    
            </div>
            </div>
    )
}