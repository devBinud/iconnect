import React, { useState } from 'react';
import Footer from '../footer/Footer';
import storeMobileProduct from '../../firebase';

const AddProducts = () => {
  const [productDetails, setProductDetails] = useState({
    company: '',
    name: '',  // Changed from 'modelName' to 'name'
    sellerName: '',
    sellerMobile: '',
    imei: '',
    regularPrice: '',
    salePrice: '',
    active: 'yes', // Default value for active status
    bill: 'yes', // Default value for bill availability
    box: 'yes',  // Default value for box availability
    sellerIdProof: '',  // New field for Seller's ID proof
    entryDate: '',  // Reset entryDate field
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!productDetails.company || !productDetails.name || !productDetails.regularPrice) {  
      alert('Please fill in all required fields.');
      return;
    }

   // Use entryDate instead of timestamp
   const productData = {
    ...productDetails,
    entryDate: productDetails.entryDate || new Date().toLocaleDateString(),  // Default to current date if not provided
  };

    storeMobileProduct(productData);
    alert('Product added successfully!');

    // Reset form fields
    setProductDetails({
      company: '',
      name: '',  
      sellerName: '',
      sellerMobile: '',
      imei: '',
      regularPrice: '',
      salePrice: '',
      active: 'yes',
      bill: 'yes',  // Reset 'bill' field
      box: 'yes',   // Reset 'box' field
      sellerIdProof: '',  // Reset seller ID proof field
      entryDate: '',  // Reset entryDate field
    });
  };

  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="card-title mb-5 text-uppercase">Add New Product</h4>
                    </div>
                  </div>

                  <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-4">
                        <p>Company Name <span className="text-danger">*</span></p>
                        <div className="form-group">
                          <select
                            className="form-control"
                            name="company"
                            value={productDetails.company}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Company</option>
                            <option value="iPhone">iPhone</option>
                            <option value="Samsung">Samsung</option>
                            <option value="Oppo">Oppo</option>
                            <option value="Vivo">Vivo</option>
                            <option value="Realme">Realme</option>
                            <option value="Oneplus">Oneplus</option>
                            <option value="Xiaomi">Xiaomi</option>
                            <option value="Motorola">Motorola</option>
                            <option value="Nokia">Nokia</option>
                            <option value="Google">Google</option>
                            <option value="LG">LG</option>
                            <option value="Honor">Honor</option>
                            <option value="Karbon">Karbon</option>
                            <option value="Sony">Sony</option>
                            <option value="Asus">Asus</option>
                            <option value="Infinix">Infinix</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Product Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={productDetails.name}
                            onChange={handleInputChange}
                            placeholder="Enter Product Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Seller Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerName"
                            value={productDetails.sellerName}
                            onChange={handleInputChange}
                            placeholder="Enter Seller Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Seller Mobile No</label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerMobile"
                            value={productDetails.sellerMobile}
                            onChange={handleInputChange}
                            placeholder="Seller Mobile No"
                          />
                        </div>
                      </div>
  {/* Seller ID Proof Dropdown */}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Seller's ID Proof</label>
                          <select
                            className="form-control"
                            name="sellerIdProof"
                            value={productDetails.sellerIdProof}
                            onChange={handleInputChange}
                          >
                            <option value="">Select ID Proof</option>
                            <option value="Aadhar Card">Aadhar Card</option>
                            <option value="Voter ID">Voter ID</option>
                            <option value="Passport">Passport</option>
                            <option value="Driver's License">Driver's License</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>IMEI No <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="imei"
                            value={productDetails.imei}
                            onChange={handleInputChange}
                            placeholder="IMEI No"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Cost Price ( ₹ )</label>
                          <input
                            type="number"
                            className="form-control"
                            name="regularPrice"
                            value={productDetails.regularPrice}
                            onChange={handleInputChange}
                            placeholder="Enter Cost Price"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Last Selling Price ( ₹ )</label>
                          <input
                            type="number"
                            className="form-control"
                            name="salePrice"
                            value={productDetails.salePrice}
                            onChange={handleInputChange}
                            placeholder="Enter Last Selling Price"
                          />
                        </div>
                      </div>
                      {/* New entryDate field */}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Entry Date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="entryDate"
                            value={productDetails.entryDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Active Status</label>
                          <select
                            className="form-control"
                            name="active"
                            value={productDetails.active}
                            onChange={handleInputChange}
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>

                      {/* Updated Bill and Box Fields (Radio Buttons) */}
                      <div className="col-md-4 d-flex align-items-center">
                        <div className="form-group">
                          <label className='font-weight-bold'>Is Bill Available?</label>
                          <div>
                            <label className="mr-3">
                              <input
                                type="radio"
                                name="bill"
                                value="yes"
                                checked={productDetails.bill === 'yes'}
                                onChange={handleInputChange}
                              />{' '}
                              Yes
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="bill"
                                value="no"
                                checked={productDetails.bill === 'no'}
                                onChange={handleInputChange}
                              />{' '}
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex align-items-center">
                        <div className="form-group">
                          <label className='font-weight-bold'>Is Box Available?</label>
                          <div>
                            <label className="mr-3">
                              <input
                                type="radio"
                                name="box"
                                value="yes"
                                checked={productDetails.box === 'yes'}
                                onChange={handleInputChange}
                              />{' '}
                              Yes
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="box"
                                value="no"
                                checked={productDetails.box === 'no'}
                                onChange={handleInputChange}
                              />{' '}
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                    
                    </div>

                    <button type="submit" className="btn btn-primary mr-2">
                      Add Product
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() =>
                        setProductDetails({
                          company: '',
                          name: '',  
                          sellerName: '',
                          sellerMobile: '',
                          imei: '',
                          regularPrice: '',
                          salePrice: '',
                          active: 'yes',
                          bill: 'yes',
                          box: 'yes',
                          sellerIdProof: '',
                           entryDate: '',
                        })
                      }
                    >
                      Cancel
                    </button>
                  </form>
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

export default AddProducts;
