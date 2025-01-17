import React from 'react';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import {Routes,Route} from "react-router-dom";
import AddCategory from "./pages/categoriesWrapper/AddCategoryWrapper"
import AllCategories from "./pages/categoriesWrapper/AllCategoriesWrapper";
import AddProducts from "./pages/productsWrapper/AddProductsWrapper";
import AllProducts from "./pages/productsWrapper/AllProductsWrapper";
import AddDiscounts from './pages/discountsWrapper/AddDiscountsWrapper';
import AllDiscounts from "./pages/discountsWrapper/AllDiscountsWrapper";
import StockUpdates from './pages/stockUpdatesWrapper/AllStockUpdatesWrapper';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/add-category" element={<AddCategory />}></Route>
        <Route path="/all-categories" element={<AllCategories />}></Route>
        <Route path="/add-product" element={<AddProducts />}></Route>
        <Route path="/all-products" element={<AllProducts />}></Route>
        <Route path="/add-discounts" element={<AddDiscounts />}></Route>
        <Route path="/all-discounts" element={<AllDiscounts />}></Route>
        <Route path="/stock-updates" element={<StockUpdates />}></Route>
      </Routes>
    </>
  );
}

export default App
