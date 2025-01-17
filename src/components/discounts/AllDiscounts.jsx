import React from 'react'
import Footer from '../footer/Footer';

const AllDiscounts = () => {
  return (
    <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">All Discounts</h4>
                  <p class="card-description">
                    You can <span className="text-danger">edit</span> and{" "}
                    <span className="text-danger">delete</span> the discounts in
                    Action Column
                  </p>
                  <div class="table-responsive pt-3">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Discount Type</th>
                          <th>Discount Amount (%)</th>
                          <th>Discount(Category)</th>
                          <th>Discount(Product)</th>
                          <th>Start Date</th>
                          <th>Expiry Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>CAT</td>
                          <td>30</td>
                          <td>Mans Traditional Cloths</td>
                          <td></td>
                          <td>2023-10-20 00:00:00</td>
                          <td>2023-10-31 00:00:00</td>
                          <td>Edit</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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

export default AllDiscounts
