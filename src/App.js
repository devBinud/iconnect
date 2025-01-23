import React from 'react';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import {Routes,Route} from "react-router-dom";
import AddCategory from "./pages/categoriesWrapper/AddCategoryWrapper"
import AllCategories from "./pages/categoriesWrapper/AllCategoriesWrapper";
import AddProducts from "./pages/productsWrapper/AddProductsWrapper";
import AllProducts from "./pages/productsWrapper/AllProductsWrapper";
import SalesReport from './pages/productsWrapper/SalesReportWrapper';
import BillGenerator from './pages/BillWrapper/BillGeneratorWrapper';
import SellWrapper from './pages/BillWrapper/SellWrapper';
import InvoicePage from './components/bill/invoice';


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
        <Route path="/sales-report" element={<SalesReport />}></Route>
        <Route path="/bill-generate" element={<BillGenerator />}></Route>
        <Route path="/quick-sale" element={<SellWrapper />}></Route>
        <Route path="/invoice/:id" element={<InvoicePage />} />
      </Routes>
    </>
  );
}

export default App
