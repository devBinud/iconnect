import React from 'react';
import Footer from '../footer/Footer';
import dash__img from "../../assets/background/2.jpg";

const Main = () => {
  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h3 className="font-weight-bold">
                    Welcome to{" "}
                    <span style={{ color: "#FF3131" }}>i</span>
                    <span style={{ color: "#004aad" }}>CONNECT</span>
                  </h3>
                  <h6 className="font-weight-normal mb-0">
  Effortlessly manage and organize your {" "}
  <span className="text-primary">
    product inventory with ease, ensuring smooth operations and growth.
  </span>
</h6>

                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6 grid-margin stretch-card">
                <div className="card-people mt-auto">
                  <img
                    src={dash__img}
                    className='img-fluid'
                    alt="dashboard-background"
                  />
                </div>
            </div>
            <div className="col-md-6 grid-margin transparent">
              <div className="row">
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-light-danger">
                    <div className="card-body">
                      <p className="mb-4">Total Phone Companies</p>
                      <p className="fs-30 mb-2">30</p>
                      <p>Calculation till today</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-light-blue">
                    <div className="card-body">
                      <p className="mb-4">Total Products</p>
                      <p className="fs-30 mb-2">544</p>
                      <p>Last updated on today</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                  <div className="card card-light-blue">
                    <div className="card-body">
                      <p className="mb-4">Todays Orders</p>
                      <p className="fs-30 mb-2">120</p>
                      <p>Last updated on today</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 stretch-card transparent">
                  <div className="card card-light-danger">
                    <div className="card-body">
                      <p className="mb-4">Todays Sales</p>
                      <p className="fs-30 mb-2">32</p>
                      <p>Data as per recent calculation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                  <div className="card card-light-danger">
                    <div className="card-body">
                      <p className="mb-4">Todays Orders</p>
                      <p className="fs-30 mb-2">120</p>
                      <p>Last updated on today</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 stretch-card transparent">
                  <div className="card card-light-blue">
                    <div className="card-body">
                      <p className="mb-4">Todays Sales</p>
                      <p className="fs-30 mb-2">32</p>
                      <p>Data as per recent calculation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                  <div className="card card-light-blue">
                    <div className="card-body">
                      <p className="mb-4">Todays Orders</p>
                      <p className="fs-30 mb-2">120</p>
                      <p>Last updated on today</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 stretch-card transparent">
                  <div className="card card-light-danger">
                    <div className="card-body">
                      <p className="mb-4">Todays Sales</p>
                      <p className="fs-30 mb-2">32</p>
                      <p>Data as per recent calculation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        {/* content-wrapper ends */}
        {/* partial:partials/_footer.html */}
        <Footer/>
      </div>
    </>
  );
}

export default Main
