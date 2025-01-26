import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import AddCategory from "./pages/categoriesWrapper/AddCategoryWrapper";
import AllCategories from "./pages/categoriesWrapper/AllCategoriesWrapper";
import AddProducts from "./pages/productsWrapper/AddProductsWrapper";
import AllProducts from "./pages/productsWrapper/AllProductsWrapper";
import SalesReport from './pages/productsWrapper/SalesReportWrapper';
import BillGenerator from './pages/BillWrapper/BillGeneratorWrapper';
import SellWrapper from './pages/BillWrapper/SellWrapper';
import InvoicePage from './components/bill/invoicePage';

const App = () => {
  const location = useLocation();

  // Define routes where header/footer should not be displayed
  const noHeaderFooterRoutes = ["/bill-generate/:id"];

  // Check if the current route matches any of the no-header-footer routes
  const hideHeaderFooter = noHeaderFooterRoutes.some(route =>
    new RegExp(`^${route.replace(/:\w+/g, "[^/]+")}$`).test(location.pathname)
  );

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/bill-generate" element={<BillGenerator />} />
        <Route path="/bill-generate/:id" element={<InvoicePage />} />
        <Route path="/quick-sale" element={<SellWrapper />} />
      </Routes>
    </>
  );
};

export default App;
