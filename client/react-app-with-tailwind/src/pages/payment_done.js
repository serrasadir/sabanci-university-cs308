import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import {  useState, useEffect } from "react";
import { GetUserID } from '../hooks/useGetuserID';
import axios from 'axios';

export function downloadPDF(address, username, city, order) {
  // Create a new jsPDF instance
  const doc = new jsPDF();
  
  // Set the font and styles
  doc.setFont('New York Times Roman', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(51, 102, 204);
  
  // Add the invoice title
  doc.text(`Invoice`, 10, 20);
  
  // Set the font for the user details
  doc.setFont('New York Times Roman', 'normal');
  doc.setFontSize(14);
  
  // Add the user details
  doc.setTextColor(0, 0, 0);
  
  doc.text(`Customer Name: ${username}`, 10, 35);
  doc.text(`City: ${city}`, 10, 45);
  doc.text(`Address: ${address}`, 10, 55);
  
  // Set the font and styles for the order details
  doc.setFont('New York Times Roman', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(51, 51, 51);
  
  // Calculate the initial y-position for the order items
  let yPos = 80;
  
  // Iterate over the order items and add them to the PDF
  order[order.length - 1].order.forEach((o, index) => {
    const productName = o.product_name;
    const price = o.price;
    doc.setFont('New York Times Roman', 'bold');
    doc.text(`Product ${index + 1}:`, 10, yPos);
    doc.setFont('New York Times Roman', 'normal');
    doc.text(productName, 40, yPos);
    doc.text(`${price}$`, 150, yPos);
    
    yPos += 15;
  });
  
  // Set the font and styles for the total amount
  doc.setFont('New York Times Roman', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(51, 102, 204);
  
  // Calculate the total amount
  
  // Add the total amount
  doc.text(`Total Amount: ${order[order.length-1].total}$`, 10, yPos + 20);
  doc.text("Wave Shopping hope to see you again!", 60, yPos + 30)
  
  // Save the PDF
  doc.save('invoice.pdf');
}



export const PaymentDone = () => {
    const [order, setOrder] = useState([])

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [username, setUsername] = useState("")
  
    const userID = GetUserID();
    


      
       

    useEffect(() => {

      console.log(userID);
      const fetchData = async (userID) => {
        try 
        {
            const response = await axios.get(`http://localhost:3001/auth/order_history/${userID}`);
            setOrder(order => [...response.data.ordered]);
        }
        catch (err)
        {
            console.error(err);
        }
      };

      const fetchUser = async (userID) => {
        try 
        {
          const response = await axios.get(`http://localhost:3001/auth/getpdf/${userID}`);
          setUsername(response.data.username);
          setAddress(response.data.address);
          setCity(response.data.city);
        } 
        catch (err)
        {
           console.error(err);
        }
      }

      fetchUser(userID);
      fetchData(userID);
    }, [userID])

    console.log(order)

  return (
    <div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
        <button onClick={() => downloadPDF(address, username, city, order)}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
         
        </button>
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p>{address}</p>
        
            <div class="py-10 text-center">
                <a href="/" class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO HOME 
               </a>
            </div>
        </div>
    </div>
  </div>
  )
}

