import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import "../App.css";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { GetUserID } from "../hooks/useGetuserID";
import { Cart } from "../context/Context";



export const PaymentProcess = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Payment />
    </div>
  );
};

const Payment = (props) => {
  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [cardNumber, setCardNumber] = useState()
  const [email, setEmail] = useState()
  const [userID, setUserID] = useState()
  const { state: { cart } } = useContext(Cart);
  const [control, setControl] = useState();
  const [user, setUser] = useState(null);
  const [total2, setTotal] = useState(0);
  let a = []

  for (let i = 0; i < cart.length; i++) {
    a.push(cart[i]);
  }


  const navigate = useNavigate();

  let userid = GetUserID();

  const [order2, setOrder] = useState({
    order: a,
    userID: userid,
    status: "Processing",
    total: cart.reduce((acc,curr) => acc + Number(curr.price), 0)
  });



useEffect(() => {
  setUserID(window.localStorage.getItem("userID"));
}, [])


const refreshPage = () => {
    window.location.reload(true);
  }


  const sendEmail = async (userID) => {
    try 
    {
        const response = await axios.get(`http://localhost:3001/auth/mail/${userID}`);
    }
    catch (err)
    {
        console.error(err);
    }
  };


const handleSubmit = async (event) => {
    event.preventDefault();
    try 
    {
         await axios.post("http://localhost:3001/order/save_order", order2);
         let a = [];
         localStorage.setItem("local_cart", JSON.stringify(a));
         /*const pdfBlob = await generatePDF(address);
         saveAs(pdfBlob, "invoice.pdf");*/
         await axios.post("http://localhost:3001/auth/paymentinfo", {
         userID,
         address,
         city,
         cardNumber,
         }); 
         sendEmail(userID);
         navigate("/payment_success")
         refreshPage();
    }
    
    catch (error)
    {
        console.error(error);
    }
};

 /* const onSubmit = async (event) => {
    event.preventDefault();

    // Generate PDF document
    const pdfBlob = await generatePDF(address);

    
    // Download PDF document
    saveAs(pdfBlob, "invoice.pdf");

    try 
    {
      
       const response = await axios.post("http://localhost:3001/auth/paymentinfo", {
        userID,
        address,
        city,
        cardNumber,
       }); 
      
    }
    catch(err) 
    {
      console.error(err);
    }


  };

  const generatePDF = async (address) => {
    const blob = await fetch("/pdf", {
      method: "POST",
      body: JSON.stringify({ address }),
    }).then((res) => res.blob());

    return blob;
  };*/
  

  return (
    <>
      <FormPayment
        email={email}
        setEmail={setEmail}      
        address={address}
        setAddress={setAddress}
        city={city}
        setCity={setCity}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        handleSubmit={handleSubmit}
        control={control}
      />
    </>
  );
};

const FormPayment = ({ email, setEmail, address, setAddress, city, setCity, cardNumber, setCardNumber, handleSubmit, control}) => {
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <img className="mx-auto h-12 w-auto" src="https://cdn-icons-png.flaticon.com/512/5509/5509636.png" alt="Your Company" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
              Payment Process
            </h2>
            
            
          </div>
          <form className="space-y-6">
            
          <div className="space-y-1">
              <label htmlFor="email" className="sr-only">
                email
              </label>
              <h2>E-mail</h2>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                placeholder="someone@mail.com"
              />
            </div>
            
            
            <div className="space-y-1">
            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <h2>Address</h2>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              placeholder="address"
            />
            </div>
           
            <div className="space-y-1">
              <label htmlFor="address" className="sr-only">
                City/Region
              </label>
              <h2>City</h2>
              <input
                type="text"
                id="address"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                placeholder="Write your city and region"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="sr-only">
                Card Number
              </label>
              <h2>Cart Number</h2>
              <input
                type="text"
                id="password"
                required
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                className="block w-full px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="sr-only">
                Card expiration date
              </label>
              <h2>Card expiration date</h2>
              <input
                type="text"
                id="password"
                required
                className="block w-full px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="mm/yy"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="sr-only">
                Cart CVC
              </label>
              <h2>Card CVC</h2>
              <input
                type="password"
                id="password"
                required
                className="block w-full px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="XXX"
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-2 px-4 bg-indigo-500 text-white font-bold rounded-md focus:outline-none focus:shadow-outline hover:bg-indigo-400"
              >
                Buy the products
              </button>
              <div> MyComponent </div>
            </div>
          </form>
        </div>
      </div>
    )
 }