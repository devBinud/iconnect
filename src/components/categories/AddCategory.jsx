import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import Footer from "../footer/Footer";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import SearchFilter from "../products/SearchFilter";

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


  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendToWhatsapp = () => {
    const selectedProductDetails = filteredProducts.filter((product) =>
      selectedProducts.includes(product.id)
    );
  
    if (!selectedProductDetails.length) {
      alert("No products selected for billing.");
      return;
    }
  
    if (!customerDetails.name || !customerDetails.contact) {
      alert("Please fill in customer details.");
      return;
    }
  
    // Format the message with bold text for customer name and closing message
    const formattedMessage = `
  *Hey ${customerDetails.name}*,
  
  I hope you are doing well. We have product recommendations for you which are available now at our iConnect store:
  
  ${selectedProductDetails.map((product, index) => `
  ${index + 1}) ${product.name}
  `).join('')}
  
  *Thanking you*,
  iConnect
  B K Kakoty Road, Ulubari
  Guwahati, PIN - 781026
    `;
  
    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(formattedMessage);
  
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/${customerDetails.contact}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  
    // Optionally, reset the form after sending
    setSelectedProducts([]); // Clear selected products
    setCustomerDetails({ name: "", contact: "", address: "", warrantyAvailable: "No", warrantyDuration: "" }); // Reset customer details
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
                  <h4 className="card-title mb-5">SHARE PRODUCT Via <span className="text-success">Whatsapp</span></h4>

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
                        placeholder="Whatsapp Number"
                        value={customerDetails.contact}
                        onChange={handleCustomerInputChange}
                        className="form-control mb-2"
                      />
                     <button
  onClick={sendToWhatsapp}
  className="btn btn-success mt-2"
>
  Send to Whatsapp
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
