import React, { useEffect, useState } from 'react';
import Footer from '../footer/Footer';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import dash__img from "../../assets/image/bgg.jpg";

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

const Main = () => {
  const [totalPhoneCompanies, setTotalPhoneCompanies] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [todaysOrders, setTodaysOrders] = useState(0);
  const [todaysSales, setTodaysSales] = useState(0);

  useEffect(() => {
    const billsRef = ref(database, 'bills');
    const companiesRef = ref(database, 'mobileProducts'); // Now using mobileProducts for both phone companies and products

    // Fetching total phone companies and products
    onValue(companiesRef, (snapshot) => {
      const data = snapshot.val();
      setTotalPhoneCompanies(data ? Object.keys(data).length : 0);
      setTotalProducts(data ? Object.keys(data).length : 0); // Counting all products from mobileProducts
    });

    // Fetching bills data to calculate today's orders and sales
    onValue(billsRef, (snapshot) => {
      const data = snapshot.val();
      let orders = 0;
      let sales = 0;
      const today = new Date().toLocaleDateString("en-IN");

      if (data) {
        Object.values(data).forEach(bill => {
          const billDate = new Date(bill.timestamp).toLocaleDateString("en-IN");
          if (billDate === today) {
            orders += bill.products.length; // Assuming each product in the bill counts as an order
            sales += bill.products.reduce((sum, product) => sum + (product.salePrice * product.quantity), 0);
          }
        });
      }

      setTodaysOrders(orders);
      setTodaysSales(sales);
    });
  }, []);

  useEffect(() => {
    const companiesRef = ref(database, 'mobileProducts');

    onValue(companiesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Mobile Products Data:", data); // Log the entire object
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          console.log(`ID: ${key}, Name: ${value.name}, Company: ${value.company}, Sale Price: ${value.salePrice}`);
        });
      }
    });
  }, []);

  // Function to format numbers in Indian style
  const formatIndianNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

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
                    Effortlessly manage and organize youryyyy{" "}
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
                  className="img-fluid"
                  alt="dashboard-background"
                />
              </div>
            </div>

            <div className="col-md-6 grid-margin transparent">
              <div className="row">
                <div className="col-md-12 mb-4 stretch-card transparent">
                  <div className="card card-light-danger">
                    <div className="card-body">
                      <p className="mb-4">Total Phone Companies</p>
                      <p className="fs-30 mb-2">{formatIndianNumber(totalPhoneCompanies)}</p>
                      <p>Calculation till today</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-4 stretch-card transparent">
                  <div className="card card-light-blue">
                    <div className="card-body">
                      <p className="mb-4">Total Products</p>
                      <p className="fs-30 mb-2">{formatIndianNumber(totalProducts)}</p>
                      <p>Last updated on today</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12 mb-4 mb-lg-0 stretch-card transparent">
                  <div className="card card-light-blue">
                    <div className="card-body">
                      <p className="mb-4">Today's Orders</p>
                      <p className="fs-30 mb-2">{formatIndianNumber(todaysOrders)}</p>
                      <p>Last updated on today</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-3 stretch-card transparent">
                  <div className="card card-light-danger">
                    <div className="card-body">
                      <p className="mb-4">Today's Sales</p>
                      <p className="fs-30 mb-2">{formatIndianNumber(todaysSales)}</p>
                      <p>Data as per recent calculation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Main;
