import React, { useContext, useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { GetUserID } from "../hooks/useGetuserID"
import { Cart } from "../context/Context"
import { getProdId } from "../hooks/getProdID"
import { Getprodid2 } from "../hooks/getprodid2"
import { GetUserName } from "../hooks/getusername"



/*const ProductDetail = async () => {
    /*const [products, setProducts] = useState([]);*/
    //const {productId} = useParams();
    //const thisProduct = products.map(prod => prod.product_id === productId);

 /*
    useEffect(() => {
       const fetchProduct = async () => {
         try 
         {
              const response = await axios.get(`http://localhost:3001/product/${productId}`);
              console.log(response);
              setProducts(response.data);
         }
         catch (err)
         {
           console.error(err);
         }
       };
 
       fetchProduct();

    },  [productId]);

    

    return (
        <div>
            <h1>{thisProduct.product_name}</h1>
            <p>Price: ${thisProduct.price}</p>
            <p>{thisProduct.description}</p>
        </div>
    )
}*/

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProductDetail(props) {

  const {state: {cart}, dispatch, } = useContext(Cart);

  const a = window.localStorage.getItem("prod_id")

  const userID = GetUserID();

  
  
  const [product, setProduct] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const [ratedProducts, setRatedProducts] = useState([]);
  const [rating, setRating2] = useState(0);
 

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value);
    setRating2(value);
  };



  const { productId } = useParams();


  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3001/product/${productId}`);
    
      window.localStorage.setItem("prod_id", response.data._id);   
      window.localStorage.setItem("prod_real_id", response.data.product_id);
      return response.data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

 


  useEffect(() => {
      const fetchProductData = async () => {
     
      const productData = await fetchProduct(productId);

      setProduct(productData);

    
      
    };

    const fetchSavedProduct = async () => {
     try
     {
         const response = await axios.get(`http://localhost:3001/product/savedProducts/ids/${userID}`);
         setSavedProducts(response.data.savedProducts);
     }
     catch (err)
     {
      console.error(err);
     }
    };

    const fetchRatedProduct = async () => {
      try
      {
          const response = await axios.get(`http://localhost:3001/product/ratedProducts/ids/${userID}`);
          setRatedProducts(response.data.ratedProducts);
      }
      catch (err)
      {
       console.error(err);
      }
     };

    
    fetchRatedProduct();
    fetchProductData();
    fetchSavedProduct();
  }, [productId]);

  const saveProduct = async (prodid) => {
    try 
    {
         const response = await axios.put("http://localhost:3001/product", 
         {
          prodid, 
          userID
        });
        setSavedProducts(response.data.savedProducts);
        alert("Product Saved")
    }
    catch (err)
    {
      console.error(err);
    }
  };


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

  console.log(ratedProducts)

  const isProductSaved = (id) => savedProducts?.includes(id);

  const isProductRated = (id) => ratedProducts?.includes(id);


  

  

  return (
    <div>
      {product ? (
        <div className="bg-white">
        <div className="pt-6">      
          {/* Image gallery */}
          <div className="border-4 border-green-500 mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-2 lg:px-2 lg:pb-12 lg:pt-16">
          <div className="border-4 aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.imageAlt}
              className="border-4 h-full w-full object-cover object-center"
            />
          </div>
            
            
            <div className="border-4 border-red-500 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-4">
              <h1 className="border-4 border-green-600 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-left">{product.product_name}</h1>
              <p className="border-4 mt-10 border-blue-600 text-xl font-medium tracking-tight text-gray-600 sm:text-xl text-left">{product.category}</p>

              <div className="border-4 mt-12 py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pt-1">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
  
                <div className="space-y-6">
                  <p className="mt-20 border-4 text-2xl font-light text-gray-900 sm:text-lg text-left">{product.description}</p>
                </div>
              </div>
              
             </div>
             <div>
                <h3 className="sr-only">Color</h3>
  
                <div className="space-y-6">
                  <p className="mt-20 border-4 text-base text-gray-900 text-left">{product.color}</p>
                </div>
              </div>

              <div>
                <h3 className="sr-only">Color</h3>
  
                <div className="space-y-6">
                  <p className="border-4 text-base text-gray-900 text-left">{product.userOwner}</p>
                </div>
              </div>

              <div>
                <h3 className="sr-only">Color</h3>
  
                <div className="space-y-6">
                  <p className="border-4 text-base text-gray-900 text-left">Product's warranty lasts for 2 years.</p>
                </div>
              </div>
              <div className="border-4 border-red-500">
                <h3 className="sr-only">Color</h3>
  
                <div className="space-y-6">
                <h1 className="border-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-right">{product.price} TL</h1>
                </div>
              </div>
              
              {!isProductSaved(product._id) && (userID != null) ?           
                 <button 
                 className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
                 onClick={() => saveProduct(product._id)} 
                 >
                 
                 Add to Wishlist
                 </button>
              :
              (userID == null) ?
                <button class="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                   Can't save without login
                </button>
                :
                <button class="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                    Already saved
                </button>
              }
            </div>
  
            {/* Options */}
  


        
          
          </div>
          
  
          {/* Product info */}
          <div className="border-4 border-red-500 mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="border-4 border-green-500 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Comments</h1>
              <CommentSection/>
            </div>

           <div className="border-4 border-green-500 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Ratings</h1>
              <div className="p-4">
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
          onClick={() => rateProduct(rating, product._id)}>
              Rate
        </button>
        <div>
          </div>
      </div>
    </div>
            </div>
            
            
            

            
          
  
            {/* Options */}
            <div className="border-4 mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div>
              {(product.comments).map((com) => (
                <p>{com.comment}</p>
              ))}

              
              </div>
              
  
                {/* Sizes */}

                
             
  
                {cart.some((p) => p.product_id === product.product_id) ? (        
    <button onClick={() => {
      dispatch({
        type:"REMOVE_FROM_CART",
        payload:product,
      });
    }} class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
      Remove From Cart 
    </button>
  ) : (
    product.stock <= 0 ? (
      <button class="px-4 py-2 font-semibold text-gray-800 border border-gray-400 rounded cursor-not-allowed opacity-50 bg-white hover:bg-gray-100">
        No Stock
      </button>
    ) : product.stock == 1 ? (
      <div class="flex items-center">
        <p class="text-sm">Only 1 left!</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <button onClick={() => {
          dispatch({
            type:"ADD_TO_CART",
            payload:product,
          });
        }} class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ml-auto">
          Add to Cart 
        </button>
      </div>
    ) : (
      <button onClick={() => {
        dispatch({
          type:"ADD_TO_CART",
          payload:product,
        });
      }} class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Add to Cart 
      </button>
    )
  )}
              
            </div>
  
            <div className="border-4 py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
             
                         <ul role="list" className="divide-y divide-gray-100">
                                {(product.comments).map((com) => (
                                <li key={com._id} className="">
                                 <div className="flex gap-x-4">
                              
                                <div className="min-w-0 flex-auto place-content: start">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">{com.comment}</p>
                                  <p> ------------ </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{com.user_name}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
            </div>
            <div>    
            </div>
          </div>
        </div>
      </div>
      ) : (
        <p>Wave is coming!</p>
      )}
    </div>
  );
}

const CommentSection = () => {

  const prod_id = getProdId();

  const userID = GetUserID();

  const prod_id_real = Getprodid2();

  const username = GetUserName();

  const [comment2, setComment] = useState({
    comment: "",
    user: userID,
    prod_id: prod_id,
    product_id_real: prod_id_real,
    user_name: username,
  });

  const handleChange = (event) => {

    const {name, value} = event.target;
    setComment({ ...comment2, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try 
    {
         await axios.post("http://localhost:3001/comment/save_comment", comment2);
         alert("Your comment sent to admin.");
    }
    catch (error)
    {
        console.error(error);
    }
};

  return (
    <div>
  {!userID ? (
    <div>
      <p>You need to login first.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-md">
        <div className="sm:col-span-2">
          <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
            Your Comment
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <textarea
                type="text"
                name="comment"
                id="comment"
                rows={3}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6 rounded-lg"
                defaultValue={''}
                placeholder="Write your comment here"
                onChange={handleChange}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Send your comment for this product.</p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Send your comment
      </button>
    </form>
  )}

</div>
  )
}


export default ProductDetail


