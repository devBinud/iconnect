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
    billboxAvailable: 'yes', // Default for billbox availability
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

  // Add timestamp
  const timestamp = Date.now();
  const productData = {
    ...productDetails,
    timestamp,
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
    billboxAvailable: 'yes',
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
                            <option value="HTC">HTC</option>
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
                          <label>Product Name <span className="text-danger">*</span></label> {/* Changed from 'Model Name' to 'Product Name' */}
                          <input
                            type="text"
                            className="form-control"
                            name="name"  // Changed from 'modelName' to 'name'
                            value={productDetails.name}  // Changed from 'modelName' to 'name'
                            onChange={handleInputChange}
                            placeholder="Enter Product Name"  // Changed from 'Enter Model Name' to 'Enter Product Name'
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
                      <div className="col-md-4 d-flex align-items-center mt-3">
                        <div className="form-group">
                          <label className='font-weight-bold'>Is Billbox Available?</label>
                          <div>
                            <label className="mr-3">
                              <input
                                type="radio"
                                name="billboxAvailable"
                                value="yes"
                                checked={productDetails.billboxAvailable === 'yes'}
                                onChange={handleInputChange}
                              />{' '}
                              Yes
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="billboxAvailable"
                                value="no"
                                checked={productDetails.billboxAvailable === 'no'}
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
                          name: '',  // Reset 'name' field
                          sellerName: '',
                          sellerMobile: '',
                          imei: '',
                          regularPrice: '',
                          salePrice: '',
                          active: 'yes',
                          billboxAvailable: 'yes',
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
