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
              <i class="icon-box menu-icon"></i>
              
              <span class="menu-title">Add Product</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/all-products">
              <i class="icon-folder menu-icon"></i>
              <span class="menu-title">All Products</span>
            </Link>
          </li>
        
       
          <li class="nav-item">
            <Link class="nav-link" to="/quick-sale">
              <i class="icon-book menu-icon"></i>
              <span class="menu-title">Product Sale</span>
            </Link>
          </li>

      
          <li class="nav-item">
            <Link class="nav-link" to="/bill-generate">
              <i class="icon-folder menu-icon"></i>
              <span class="menu-title">Bill Generate</span>
            </Link>
          </li>

     
          
          <li class="nav-item">
            <Link class="nav-link" to="/share-product">
              <i class="icon-share menu-icon"></i>
              <span class="menu-title">Whatsapp Share</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/sales-report">
              <i class="icon-map menu-icon"></i>
              <span class="menu-title">Sales Report</span>
            </Link>
          </li>
          
          
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar
