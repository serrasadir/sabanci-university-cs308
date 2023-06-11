import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import {  useState, useEffect } from "react";
import { GetUserID } from '../hooks/useGetuserID';
import axios from 'axios';

export const PaymentDone = () => {
    const [order, setOrder] = useState([])

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [username, setUsername] = useState("")
    const [useremail, setUseremail] = useState("")
  
    const userID = GetUserID();


    
      
    useEffect(() => {

      console.log(userID);

      const fetchUser = async (userID) => {
        try 
        {
          const response = await axios.get(`http://localhost:3001/auth/getpdf/${userID}`);
          setOrder(order => [...response.data.ordered]);
          setUsername(response.data.username);
          setAddress(response.data.address);
          setCity(response.data.city);
          setUseremail(response.data.useremail);
          
        } 
        catch (err)
        {
           console.error(err);
        }
      }

      fetchUser(userID);
    }, [userID])

    //console.log(order)


  return (
    <div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
        <button onClick={() => downloadPDF(address, username, city, order, useremail)}> 
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


export function downloadPDF(address, username, city, order2, useremail) {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set the font and styles

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(51, 102, 204);

  // Add the order title
  doc.text(`ORDER INVOICE`, 10, 20);

  // Set the font for the user details
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);

  // Add the user details
  doc.setTextColor(0, 0, 0);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Customer Name:`, 10, 35);
  doc.setFont('Helvetica', 'normal');
  doc.text(`${username}`, 45, 35);

  doc.setFont('Helvetica', 'bold');
  doc.text(`City:`, 10, 45);
  doc.setFont('Helvetica', 'normal');
  doc.text(`${city}`, 20, 45);

  doc.setFont('Helvetica', 'bold');
  doc.text(`Address:`, 10, 55);
  doc.setFont('Helvetica', 'normal');
  doc.text(`${address}`, 30, 55);
  // Set the font and styles for the table header
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);

  // Define the table header column positions
  const headerNameX = 10;
  const headerPriceX = 150;
  const headerY = 70;

  // Add the table header
  doc.setFillColor(255, 255, 255);
  doc.rect(headerNameX, headerY, headerPriceX - headerNameX, 10, 'F');
  doc.text('Product Name', headerNameX , headerY + 8);
  doc.text('Product Price', headerPriceX , headerY + 8);

  // Set the font and styles for the table content
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(51, 51, 51);

  // Calculate the initial y-position for the table content
  let yPos = headerY + 15;

  // Iterate over the order items and add them to the table
  order2[order2.length - 1].order.forEach((o, index) => {
    const productName = o.product_name;
    const price = o.price;

    // Add the product details to the table
    doc.text(productName, headerNameX, yPos);
    doc.text(`${price}$`, headerPriceX, yPos);

    yPos += 10;
  });

  // Set the font and styles for the total amount
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(51, 51, 51);

  // Calculate the total amount
  const totalAmount = order2[order2.length - 1].total;

  // Add the total amount below the table
  doc.text(`Total Amount: ${totalAmount}$`, 123, yPos);

  doc.setFont('Helvetica', 'bolditalic');
  doc.setFontSize(12);
  doc.setTextColor(51, 51, 51);

  doc.text("Wave Shopping hopes to see you again!", 60, yPos + 20);

  // Save the PDF

  doc.save('invoice.pdf')
 
  
  
}