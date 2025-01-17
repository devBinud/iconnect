import React from 'react'
import Footer from '../footer/Footer';

const AddDiscounts = () => {
  return (
    <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title mb-4">Add Discounts</h4>
                  <form class="forms-sample">
                    <div class="row">
                      <div class="col-md-4">
                        <p>Discount Type</p>
                        <div class="form-group row">
                          <div class="col-md-12">
                            <select class="form-control">
                              <option>CAT</option>
                              <option>PROD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputUsername1">
                            Discount Amount (%)
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            placeholder="Discount Amount in %"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <p>Select Product Category</p>
                        <div class="form-group row">
                          <div class="col-md-12">
                            <select class="form-control">
                              <option>Category 1</option>
                              <option>Category 2</option>
                              <option>Category 3</option>
                              <option>Category 4</option>
                              <option>Category 5</option>
                              <option>Category 6</option>
                              <option>Category 7</option>
                              <option>Category 8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputUsername1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputUsername1"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputUsername1">
                            Expiry Date
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputUsername1"
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-primary mr-2">
                      Save 
                    </button>
                    <button class="btn btn-light">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- content-wrapper ends --> */}
        {/* <!-- partial:../../partials/_footer.html --> */}
        <Footer />
        {/* <!-- partial --> */}
      </div>
    </>
  );
}

export default AddDiscounts
