import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Import the autotable plugin
import Footer from "../footer/Footer";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import AllProductsFilter from "./AllProductsFilter";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArDqtcSmGsHreF89UWHVxsiivO9vZr8E8",
  authDomain: "iconnect-58f0b.firebaseapp.com",
  databaseURL: "https://iconnect-58f0b-default-rtdb.firebaseio.com",
  projectId: "iconnect-58f0b",
  storageBucket: "iconnect-58f0b.firebasestorage.app",
  messagingSenderId: "343564096721",
  appId: "1:343564096721:web:70c585e32e2679f5c1e1f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const productsRef = ref(database, "mobileProducts");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }));
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }
      setLoading(false);
    });
  }, []);

  const handleFilter = (filterCriteria) => {
    const { company, minPrice, maxPrice, search, startDate, endDate } = filterCriteria;
    
    setLoading(true);

    const filtered = products.filter((product) => {
      const matchesCompany = company
        ? product.company?.toLowerCase().includes(company.toLowerCase())
        : true;

      const matchesSearch = search
        ? product.name?.toLowerCase().includes(search.toLowerCase()) ||
          product.company?.toLowerCase().includes(search.toLowerCase()) ||
          product.salePrice?.toString().includes(search) ||
          product.regularPrice?.toString().includes(search)
        : true;

      const matchesMinPrice = minPrice ? product.salePrice >= minPrice : true;
      const matchesMaxPrice = maxPrice ? product.salePrice <= maxPrice : true;

      const matchesStartDate = startDate
        ? new Date(product.timestamp) >= new Date(startDate)
        : true;

      const matchesEndDate = endDate
        ? new Date(product.timestamp) <= new Date(endDate)
        : true;

      return (
        matchesCompany &&
        matchesSearch &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesStartDate &&
        matchesEndDate
      );
    });

    setFilteredProducts(filtered);
    setLoading(false);
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
  
    // Title: i-#FF3131 and Connect#004aad (No gap between "i" and "Connect")
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    
    // "i" in red color
    doc.setTextColor(255, 49, 49); // Red color for "i"
    doc.text("i", 14, 20); // Position "i" at x=14, y=20
    
    // "Connect" in blue color, no gap between "i" and "Connect"
    doc.setTextColor(0, 74, 173); // Blue color for "Connect"
    const iWidth = doc.getTextWidth("i"); // Get width of "i"
    doc.text("Connect", 14 + iWidth, 20); // Position "Connect" immediately after "i"
  
    // Subtitle: "Your trusted source for iPhone"
    doc.setFontSize(10); // Smaller font size for the subtitle
    doc.setFont("helvetica", "normal");
    doc.setTextColor(169, 169, 169); // Light gray color for the subtitle
    doc.text("Your trusted source for iPhone", 14, 30); // No gap between iConnect and subtitle
  
    // Address: iConnect, BK Kakoty Road, etc.
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal"); // Set to normal font for address
    doc.text("BK Kakoty Road, Near Ulubari Bridge", 14, 45);
    doc.text("Guwahati, Assam", 14, 50);
    doc.text("PIN - 781007", 14, 55); // PIN is not bold anymore
  
    // Add some space before the table
    let yPosition = 65; // Position for the table to start
  
    // Define the columns for the table
    const columns = [
      { title: "#", dataKey: "index" },
      { title: "Product Name", dataKey: "name" },
      { title: "Company", dataKey: "company" },
      { title: "Regular Price", dataKey: "regularPrice" },
      { title: "Sale Price", dataKey: "salePrice" },
      { title: "Entry Date", dataKey: "entryDate" },
      { title: "Sale Status", dataKey: "status" }
    ];
  
    // Prepare the rows with the product data
    const rows = filteredProducts.map((product, index) => ({
      index: index + 1,
      name: product.name,
      company: product.company,
      regularPrice: `$${product.regularPrice}`,
      salePrice: `$${product.salePrice}`,
      entryDate: formatDate(product.timestamp),
      status: product.status
    }));
  
    // Set the font for the table content (normal font)
    doc.setFont("helvetica", "normal");
  
    // Add the table to the PDF with styling
    doc.autoTable(columns, rows, {
      startY: yPosition, // Start the table below the title and address
      styles: {
        fontSize: 10, // Font size for table content
        cellPadding: 5, // Padding inside the cells
        halign: "center", // Horizontal alignment of text in cells
        valign: "middle", // Vertical alignment of text in cells
        lineColor: [221, 221, 221], // Border color for the table (light gray #ddd)
        lineWidth: 0.5, // Border width
        textColor: [64, 60, 69], // Dark gray text color for table data
      },
      headStyles: {
        fillColor: [0, 74, 173], // Dark blue color for the table header (#004aad)
        textColor: [255, 255, 255], // White text color in the header
        fontStyle: "bold", // Make header text bold
      },
      bodyStyles: {
        fillColor: [255, 255, 250], // Light gray color for table rows
      },
      theme: "grid", // Use grid lines for the table
    });
  
    // Save the PDF
    doc.save("products.pdf");
  };
  
  
  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-5">All Products</h4>

                  <AllProductsFilter onFilter={handleFilter} />

                  {loading ? (
                    <div className="loader">Loading...</div>
                  ) : (
                    <div className="table-responsive pt-3">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Company</th>
                            <th>Regular Price</th>
                            <th>Sale Price</th>
                            <th>Entry Date</th>
                            <th>Sale Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                              <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.company}</td>
                                <td>₹{product.regularPrice}</td>
                                <td>₹{product.salePrice}</td>
                                <td>{product.timestamp ? formatDate(product.timestamp) : 'Not available'}</td>

                                <td>
  <button type="button" className={`btn ${product.status ? 'btn-danger' : 'btn-success'}`}>
    {product.status || 'Mark As Sold'}
  </button>
</td>


                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" style={{ textAlign: "center" }}>
                                No products found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  <button onClick={exportAsPDF} type="button" class="btn btn-info btn-icon-text mt-3">
                  Export as PDF
                          <i class="ti-printer btn-icon-append"></i>                                                                              
                        </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AllProducts;
