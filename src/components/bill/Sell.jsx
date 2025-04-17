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

const Sell = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    contact: "",
    address: "",
    warrantyAvailable: "No",
    warrantyDuration: "",
  });
  const [quantities, setQuantities] = useState({}); // To store quantity for each selected product
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const productsPerPage = 10;

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

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveBillData = () => {
    const selectedProductDetails = filteredProducts.filter((product) =>
      selectedProducts.includes(product.id)
    );

    if (!selectedProductDetails.length) {
      alert("No products selected for billing.");
      return;
    }

    if (!customerDetails.name || !customerDetails.contact || !customerDetails.address) {
      alert("Please fill in customer details.");
      return;
    }

    const billData = {
      customerDetails,
      products: selectedProductDetails.map((product) => ({
        ...product,
        quantity: quantities[product.id] || 1, // Use the quantity from the state
      })),
      timestamp: new Date().toISOString(),
    };

    const newBillRef = ref(database, `bills/${Date.now()}`);
    set(newBillRef, billData)
      .then(() => {
        alert("Bill data saved successfully!");
        setSelectedProducts([]); // Clear selected products
        setQuantities({}); // Clear quantities
        setCustomerDetails({ name: "", contact: "", address: "", warrantyAvailable: "No", warrantyDuration: "" }); // Reset customer details
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
                  <h4 className="card-title mb-5 text-uppercase">Product Sale</h4>

                  <SearchFilter onFilter={handleFilter} />

                  {loading ? (
                    <div className="loader">Loading...</div>
                  ) : (
                    <>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Select Phone</th>
                              <th>Sl No</th>
                              <th>Product Name</th>
                              <th>Company</th>
                              <th>Sale Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentProducts.length > 0 ? (
                              currentProducts.map((product, index) => (
                                <tr key={product.id}>
                                  <td>
                                    <button
                                      onClick={() => handleSelectProduct(product.id)}
                                      className={`btn ${
                                        selectedProducts.includes(product.id)
                                          ? "btn-danger"
                                          : "btn-outline-success"
                                      }`}
                                    >
                                      {selectedProducts.includes(product.id) ? "Deselect" : "Select"}
                                    </button>
                                  </td>
                                  <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
                                  <td>{product.name}</td>
                                  <td>{product.company}</td>
                                  <td>₹{product.salePrice}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                  No products found.
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

                 {/* Show selected product with quantity input */}
{selectedProducts.length > 0 && (
  <div className="selected-products mt-4">
    <h5 className="mb-4">Selected Products</h5>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {selectedProducts.map((productId) => {
          const product = filteredProducts.find(
            (product) => product.id === productId
          );
          return (
            <tr key={productId}>
              <td>{product.name}</td>
              <td>₹{product.salePrice}</td>
              <td>
                <input
                  type="number"
                  value={quantities[productId] || 1}
                  onChange={(e) =>
                    handleQuantityChange(productId, e.target.value)
                  }
                  className="form-control"
                  min="1"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}


                  {/* Customer Details Form */}
                  {selectedProducts.length > 0 && (
                    <div className="customer-details mt-4">
                      <h5 className="mb-4">Customer Details</h5>
                      <input
                        type="text"
                        name="name"
                        placeholder="Customer Name"
                        value={customerDetails.name}
                        onChange={handleCustomerInputChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        value={customerDetails.contact}
                        onChange={handleCustomerInputChange}
                        className="form-control mb-2"
                      />
                      <textarea
                        name="address"
                        placeholder="Address"
                        value={customerDetails.address}
                        onChange={handleCustomerInputChange}
                        className="form-control mb-2"
                      ></textarea>
                      <select
                        name="warrantyAvailable"
                        value={customerDetails.warrantyAvailable}
                        onChange={handleCustomerInputChange}
                        className="form-control mb-2"
                      >
                        <option value="No">Warranty Available?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {customerDetails.warrantyAvailable === "Yes" && (
                        <input
                          type="text"
                          name="warrantyDuration"
                          placeholder="Warranty Duration (e.g., 6 months, 1 year)"
                          value={customerDetails.warrantyDuration}
                          onChange={handleCustomerInputChange}
                          className="form-control mb-2"
                        />
                      )}
                      <button
                        onClick={saveBillData}
                        className="btn btn-success mt-2"
                      >
                        Save Bill Data
                      </button>
                    </div>
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

export default Sell;
