import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { GetUserID } from "../hooks/useGetuserID"


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
  const [product, setProduct] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);

  const { productId } = useParams();
  const userID = GetUserID();

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3001/product/${productId}`);
      console.log(response.data);
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
    }
    catch (err)
    {
      console.error(err);
    }
  };

  const isProductSaved = (id) => savedProducts.includes(id);

  

  return (
    <div>
      {product ? (
        <div className="bg-white">
        <div className="pt-6">      
  
          {/* Image gallery */}
          <div className="border-4 border-green-500 mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-2 lg:px-2 lg:pb-12 lg:pt-16">
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
              {!isProductSaved(product._id) ? 
                 <button 
                 className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
                 onClick={() => saveProduct(product._id)} 
                 >

                 Add to Wishlist
                 </button>
              :
                <button class="bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                    Already Saved
                </button>
              }

            </div>
  
            {/* Options */}
  


        
          <div className="border-4 aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.imageAlt}
              className="border-4 h-full w-full object-cover object-center"
            />
          </div>
          </div>
  
          {/* Product info */}
          <div className="border-4 mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Reviews</h1>
            </div>
  
            {/* Options */}
            <div className="border-4 mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">Size options</p>
  
  
              <form className="mt-10">               
  
                {/* Sizes */}
             
  
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </form>
            </div>
  
            <div className="border-4 py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          
  
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

export default ProductDetail


