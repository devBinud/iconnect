import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import Footer from "../footer/Footer";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import SearchFilter from "../products/SearchFilter";
import "./Sell.css";

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

const BillGenerator = () => {
  const [bills, setBills] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log('BILLS ARRAY :' ,bills);

  const productsPerPage = 10;

   useEffect(() => {
     setLoading(true);
     const billsRef = ref(database, "bills");
     onValue(billsRef, (snapshot) => {
       const data = snapshot.val();
       if (data) {
         const billsArray = Object.entries(data).map(([id, bill]) => ({
           id,
           ...bill,
         }));
         console.log("Bills Data:", billsArray); // Log the bills data
         setBills(billsArray);
       } else {
         console.log("No data found");
         setBills([]);
       }
       setLoading(false);
     });
   }, []);

  const handleFilter = (filterCriteria) => {
    const { company, minPrice, maxPrice, search, startDate, endDate } =
      filterCriteria;

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

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const saveBillData = () => {
    const selectedProductDetails = filteredProducts.filter((product) =>
      selectedProducts.includes(product.id)
    );

    if (!selectedProductDetails.length) {
      alert("No products selected for billing.");
      return;
    }

    const billData = {
      products: selectedProductDetails,
      timestamp: new Date().toISOString(),
    };

    const newBillRef = ref(database, `bills/${Date.now()}`);
    set(newBillRef, billData)
      .then(() => {
        alert("Bill data saved successfully!");
        setSelectedProducts([]); // Clear selected products
      })
      .catch((error) => {
        console.error("Error saving bill data:", error);
        alert("Failed to save bill data. Please try again.");
      });
  };

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-5">Product Sale</h4>

                  <SearchFilter onFilter={handleFilter} />

                  {loading ? (
                    <div className="loader">Loading...</div>
                  ) : (
                    <>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Select Product</th>
                              <th>Bill ID</th>
                              <th>Customer Name</th>
                              <th>Phone No</th>
                              <th>Address</th>
                              <th>Model Name</th>
                              <th>Company Name</th>
                              <th>Sale Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                        {bills.length > 0 ? (
                          bills.map((bill) => (
                            bill.products.map((product, index) => (
                              <tr key={product.id}>
                                {/* Only show buyer details for the first product */}
                                {index === 0 && (
                                  <>
                                    <td>
                                    <button
                                      onClick={() => handleSelectProduct(product.id)}
                                      className={`btn ${
                                        selectedProducts.includes(product.id)
                                          ? "btn-danger"
                                          : "btn-outline-success"
                                      }`}
                                    >
                                      {selectedProducts.includes(product.id)
                                        ? "Deselect"
                                        : "Select"}
                                    </button>
                                  </td>
                                    <td rowSpan={bill.products.length}>
                                      {bill.id}
                                    </td>
                                    <td rowSpan={bill.products.length}>
                                      {bill.customerDetails?.name} {/* Displaying the name */}
                                    </td>
                                    <td rowSpan={bill.products.length}>
                                      {bill.customerDetails?.contact}
                                    </td>
                                    <td rowSpan={bill.products.length}>
                                      {bill.customerDetails?.address}
                                    </td>
                                  </>
                                )}
                                <td>{product.name}</td>
                                <td>{product.company}</td>
                                <td>₹{product.salePrice}</td>
                                <td>₹{product.quantity}</td>
                              </tr>
                            ))
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                              No bills found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <div className="pagination mt-3 d-flex align-center justify-content-center">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`btn-xs shadow-none ${
                              currentPage === i + 1
                                ? "btn-primary mx-2"
                                : "btn-outline-primary"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <button
                    onClick={saveBillData}
                    className="btn btn-success mt-4"
                  >
                    Save Bill Data
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

export default BillGenerator;
