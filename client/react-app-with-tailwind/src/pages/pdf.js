import React from 'react';
import jsPDF from 'jspdf';

const generatePDF = (address, city, orderDetails) => {
  const doc = new jsPDF();

  // Set document properties
  doc.setProperties({
    title: 'Order Details',
  });

  // Add content to the PDF
  doc.setFontSize(12);
  doc.text('Order Details', 10, 10);
  doc.text(`Address: ${address}`, 10, 20);
  doc.text(`City: ${city}`, 10, 30);
  doc.text('Order:', 10, 40);

  // Loop through the order details and add them to the PDF
  orderDetails.forEach((item, index) => {
    const y = 50 + index * 10;
    doc.text(`${index + 1}. ${item}`, 10, y);
  });

  // Save the PDF
  doc.save('order_details.pdf');
};

const MyComponent = () => {
  const address = '123 Main St';
  const city = 'New York';
  const orderDetails = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div>
      <button onClick={() => generatePDF(address, city, orderDetails)}>
        Generate PDF
      </button>
    </div>
  );
};

export default MyComponent;
