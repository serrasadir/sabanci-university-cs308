import { useState } from "react";
import { Rating } from "./Rating";



export const Filters = () => {
     
     const [rate, setRate] = useState(3);


    return (
        <div className= "filters">
            <span className="title">Filter Products</span>
            <span>
            <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>

            </span> 
            <span>
                <label> Rating: </label>
                <Rating rating={rate} 
                onClick={(i)=>setRate(i+1)} 
                style={{cursor: "pointer"}} />

            </span>
            <button variant="light" >Clear Filters</button>

        </div>
    )
}