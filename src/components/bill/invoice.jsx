import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoicePage = () => {
  const location = useLocation();
  const { selectedProducts } = location.state || [];

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Invoice', 20, 20);
    doc.autoTable({
      startY: 30,
      head: [['Product', 'Company', 'Price', 'Quantity']],
      body: selectedProducts.map((product) => [
        product.name,
        product.company,
        `₹${product.salePrice}`,
        product.quantity,
      ]),
    });

    doc.save('invoice.pdf');
  };

  return (
    <div className="invoice-page">
      <h2>Invoice</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Company</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.company}</td>
              <td>₹{product.salePrice}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={generatePDF} className="btn btn-primary">
        Save as PDF
      </button>
    </div>
  );
};

export default InvoicePage;
