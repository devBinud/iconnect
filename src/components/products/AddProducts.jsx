import React, { useState } from 'react';
import Footer from '../footer/Footer';
import storeMobileProduct from '../../firebase';

const AddProducts = () => {
  const [productDetails, setProductDetails] = useState({
    company: '',
    name: '',
    regularPrice: '',
    discount: '',
    salePrice: '',
    active: 'yes', // Default value for active status
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
      salePrice:
        name === 'regularPrice' || name === 'discount'
          ? calculateSalePrice(prevDetails.regularPrice, prevDetails.discount, name, value)
          : prevDetails.salePrice,
    }));
  };

  // Calculate sale price
  const calculateSalePrice = (regularPrice, discount, changedField, changedValue) => {
    const updatedRegularPrice = changedField === 'regularPrice' ? parseFloat(changedValue) || 0 : parseFloat(regularPrice) || 0;
    const updatedDiscount = changedField === 'discount' ? parseFloat(changedValue) || 0 : parseFloat(discount) || 0;

    return updatedRegularPrice - (updatedRegularPrice * updatedDiscount) / 100;
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

    // Save product to Firebase
    storeMobileProduct(productData);
    alert('Product added successfully!');
    setProductDetails({
      company: '',
      name: '',
      regularPrice: '',
      discount: '',
      salePrice: '',
      active: 'yes', // Reset active status to default
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
                  <h4 className="card-title mb-5">Add New Product</h4>
                  <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-4">
                        <p>Select Modal Company</p>
                        <div className="form-group row">
                          <div className="col-md-12">
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
                              <option value="Realme">Realme</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>Enter Product Name</label>
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
                          <label>Regular Product Price ( ₹ )</label>
                          <input
                            type="number"
                            className="form-control"
                            name="regularPrice"
                            value={productDetails.regularPrice}
                            onChange={handleInputChange}
                            placeholder="Enter Regular Price"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Add Discount (%)</label>
                          <input
                            type="number"
                            className="form-control"
                            name="discount"
                            value={productDetails.discount}
                            onChange={handleInputChange}
                            placeholder="Add Discount"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Sale Price ( ₹ )</label>
                          <input
                            type="number"
                            className="form-control"
                            name="salePrice"
                            value={productDetails.salePrice}
                            readOnly
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
                    </div>

                    <button type="submit" className="btn btn-primary mr-2">
                      Publish Product
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() =>
                        setProductDetails({
                          company: '',
                          name: '',
                          regularPrice: '',
                          discount: '',
                          salePrice: '',
                          active: 'yes',
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
