import React from 'react';
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div>
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </a>
          </li>
          <li class="ml-3 mt-2 text-secondary">Masters</li>
          
          <li class="nav-item">
            <Link class="nav-link" to="/add-product">
              <i class="icon-grid menu-icon"></i>
              
              <span class="menu-title">Add New Product</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/all-products">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">View All Products</span>
            </Link>
          </li>
        
          <li class="nav-item">
            <Link class="nav-link" to="/add-category">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">Add New Stocks</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/all-categories">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">View All Stocks</span>
            </Link>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="collapse"
              href="#customerReview"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i class="icon-layout menu-icon"></i>
              <span class="menu-title">Testimonials</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="customerReview">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item">
                  <Link class="nav-link" to="/">
                    Add Review
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/">
                    View All Reviews
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/">
                    Published Reviews
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/">
                    Pending Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item">
            <Link class="nav-link" to="/stock-updates">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">Sales Report</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/stock-updates">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">Inventory Updates</span>
            </Link>
          </li>
          
          
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar
