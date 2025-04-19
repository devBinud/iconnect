import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import Footer from "../footer/Footer";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import SearchFilter from "../products/SearchFilter";
import "./Sell.css";
import Loader from "../loader/Loader";

import { useNavigate } from "react-router-dom";


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
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate(); // for redirection


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
        quantity: quantities[product.id] || 1,
      })),
      timestamp: new Date().toISOString(),
    };

    const newBillRef = ref(database, `bills/${Date.now()}`);
    set(newBillRef, billData)
      .then(() => {
        setShowSuccessModal(true); // Show modal instead of alert
        setSelectedProducts([]);
        setQuantities({});
        setCustomerDetails({ name: "", contact: "", address: "", warrantyAvailable: "No", warrantyDuration: "" });
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
            <div className="col-lg-7 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4 text-capitalize">Product Sale & <span className="badge badge-warning">Save Bill</span></h4>
                  <SearchFilter onFilter={handleFilter} />

                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered">
                          <thead className="bg-secondary text-dark">
                            <tr>
                              <th>Select Phone</th>
                              {/* <th>Sl No</th> */}
                              <th>Product Name</th>
                              <th>Company</th>
                              <th>Sale Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentProducts.length > 0 ? (
                              currentProducts.map((product, index) => {
                                const isSelected = selectedProducts.includes(product.id);
                                return (
                                  <tr
                                    key={product.id}
                                    className={isSelected ? "table-active selected-row" : ""}
                                  >
                                    <td>
                                      <button
                                        onClick={() => handleSelectProduct(product.id)}
                                        className={`btn ${isSelected ? "btn-danger" : "btn-success"}`}
                                      >
                                        {isSelected ? "Deselect" : "Select"}
                                      </button>
                                    </td>
                                    <td>
                                      <span style={{ textTransform: "capitalize" }}>
                                        {index + 1}. {product.name.toLowerCase()}
                                      </span>
                                      <br />
                                      <p className="badge badge-secondary my-2">{product.imei}</p>
                                    </td>
                                    <td>{product.company}</td>
                                    <td>₹{Number(product.regularPrice).toLocaleString("en-IN")}</td>
                                  </tr>
                                );
                              })
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
                      {/* Pagination Logic */}
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <button
                          className="btn btn-outline-primary"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          <i className="fas fa-arrow-left mr-2"></i> Previous
                        </button>

                        <strong>Page {currentPage} of {totalPages}</strong>

                        <button
                          className="btn btn-outline-primary"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Next <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                      </div>


                    </>
                  )}


                </div>
              </div>
            </div>
            <div className="col-lg-5">

              {selectedProducts.length > 0 && (
                <div className="row">
                  {/* Selected Products Table */}
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title mb-4">Create E-Bill <span className="badge badge-warning">Selected Products</span></h5>
                        <table className="table table-bordered table-sm">
                          <thead className="thead-light">
                            <tr>
                              <th className="py-2">Product  & IMEI</th>
                              <th className="py-2">Price</th>
                              <th className="text-center py-2">Qty</th>
                              <th className="py-2">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedProducts.map((productId, index) => {
                              const product = filteredProducts.find(
                                (product) => product.id === productId
                              );

                              const quantity = quantities[productId] || 1;
                              const subtotal = product.regularPrice * quantity;

                              return (
                                <tr key={productId}>
                                  <td>
                                    <span style={{ textTransform: "capitalize" }}>
                                      {index + 1}. {product.name.toLowerCase()}
                                    </span>
                                    <br />
                                    <p className="badge badge-secondary my-2">{product.imei}</p>
                                  </td>

                                  <td>₹{Number(product.regularPrice).toLocaleString("en-IN")}</td>
                                  <td className="align-middle" style={{ maxWidth: "120px" }}>
                                    <div className="input-group input-group-sm">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">Qty</span>
                                      </div>
                                      <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(productId, e.target.value)}
                                        className="form-control text-center"
                                        min="1"
                                      />
                                    </div>
                                  </td>

                                  <td className="badge-small badge-success">₹{Number(subtotal).toLocaleString("en-IN")}</td>
                                </tr>
                              );
                            })}
                          </tbody>

                          <tr className="bg-light">
                            <td colSpan="3" className="text-right pr-4 py-3 pt-3 pb-3">
                              <strong style={{ fontSize: "1rem" }}>Final Price:</strong>
                            </td>
                            <td className="py-3 font-weight-bold text-success" style={{ fontSize: "1.1rem" }}>
                              ₹{
                                selectedProducts.reduce((total, productId) => {
                                  const product = filteredProducts.find(p => p.id === productId);
                                  const qty = quantities[productId] || 1;
                                  return total + (product.regularPrice * qty);
                                }, 0).toLocaleString("en-IN")
                              }
                            </td>
                          </tr>

                        </table>


                      </div>
                    </div>
                  </div>

                  {/* Customer Details Form */}
                  <div className="col-md-12 mt-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title mb-4">Customer Details <span className="badge badge-warning">Fillup all details </span></h5>
                        <input
                          type="text"
                          name="name"
                          placeholder="Customer Name"
                          value={customerDetails.name}
                          onChange={handleCustomerInputChange}
                          className="form-control form-control-sm mb-2"
                        />
                        <input
                          type="text"
                          name="contact"
                          placeholder="Contact Number"
                          value={customerDetails.contact}
                          onChange={handleCustomerInputChange}
                          className="form-control form-control-sm mb-2"
                        />
                        <textarea
                          name="address"
                          placeholder="Address"
                          value={customerDetails.address}
                          onChange={handleCustomerInputChange}
                          className="form-control form-control-sm mb-2"
                        ></textarea>
                        <select
                          name="warrantyAvailable"
                          value={customerDetails.warrantyAvailable}
                          onChange={handleCustomerInputChange}
                          className="form-control form-control-sm mb-2"
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
                            className="form-control form-control-sm mb-2"
                          />
                        )}
                        <button
                          onClick={saveBillData}
                          className="btn btn-primary mt-2 w-100"
                        >
                          Save Bill Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
        {showSuccessModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-centered">
              <div className="modal-content text-center">
                <div className="modal-body py-5">
                  <i className="fas fa-check-circle text-success mb-3" style={{ fontSize: '4rem', animation: 'pop 0.3s ease' }}></i>
                  <h5 className="mt-3">Bill data saved successfully!</h5>
                </div>
                <div className="modal-footer justify-content-center">
                  <button className="btn btn-primary" onClick={() => navigate("/bill-generate")}>
                    Generate Bill Now
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowSuccessModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        <Footer />
      </div>
    </>
  );
};

export default Sell;
