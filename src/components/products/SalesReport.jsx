import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import SearchFilter from "../products/SearchFilter";
import Footer from "../footer/Footer";

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

const SalesReport = () => {
  const [bills, setBills] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);

  const productsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const productsRef = ref(database, "bills");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }));
        setBills(productsArray);
        setFilteredProducts(productsArray);
      } else {
        setBills([]);
        setFilteredProducts([]);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Calculate total sales
    const total = bills.reduce((sum, bill) => {
      return (
        sum +
        bill.products.reduce(
          (productSum, product) =>
            productSum + product.salePrice * product.quantity,
          0
        )
      );
    }, 0);
    setTotalSales(total);
  }, [bills]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-IN");

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN");
  };

  // Format the amount in Indian currency format
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  // Calculate today's sales
  const todaySales = bills.reduce((sum, bill) => {
    const billDate = new Date(bill.timestamp);
    const isToday = billDate.toLocaleDateString("en-IN") === formattedToday;

    if (isToday) {
      return (
        sum +
        bill.products.reduce(
          (productSum, product) =>
            productSum + product.salePrice * product.quantity,
          0
        )
      );
    }
    return sum;
  }, 0);

  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">SALES REPORT</h4>

                  {/* Daily Sales Total */}
                  <div className="row justify-content-between">
                    <div className="col-md-6 mb-4 stretch-card transparent">
                      <div className="card card-light-danger">
                        <div className="card-body">
                          <p className="mb-4">Today's Sale</p>
                          <p className="fs-30 mb-2">
                            {formatCurrency(todaySales)}
                          </p>
                          <p>Last updated on today</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4 stretch-card transparent">
                      <div className="card card-light-blue">
                        <div className="card-body">
                          <p className="mb-4">Total Sales</p>
                          <p className="fs-30 mb-2">
                            {formatCurrency(totalSales)}
                          </p>
                          <p>Last updated on today</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Filter */}
                  <SearchFilter onFilter={() => {}} />

                  {/* Table */}
                  {loading ? (
                    <div className="loader">Loading...</div>
                  ) : (
                    <>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>Bill ID</th>
                              <th>Customer Name</th>
                              <th>Product Name</th>
                              <th>Price (₹)</th>
                              <th>Quantity</th>
                              <th>Total (₹)</th>
                              <th>Timestamp</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bills.length > 0 ? (
                              bills.map((bill) =>
                                bill.products.map((product, index) => (
                                  <tr key={`${bill.id}-${index}`}>
                                    {index === 0 && (
                                      <td rowSpan={bill.products.length}>
                                        {bill.id}
                                      </td>
                                    )}
                                    {index === 0 && (
                                      <td rowSpan={bill.products.length}>
                                        {bill.customerDetails.name || "Unknown"}
                                      </td>
                                    )}
                                    <td>{product.name}</td>
                                    <td>{formatCurrency(product.salePrice)}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                      {formatCurrency(
                                        product.salePrice * product.quantity
                                      )}
                                    </td>
                                    <td>{getFormattedDate(bill.timestamp)}</td>
                                  </tr>
                                ))
                              )
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
                      <div className="pagination mt-3 d-flex align-items-center justify-content-center">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`btn btn-sm ${
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

export default SalesReport;
