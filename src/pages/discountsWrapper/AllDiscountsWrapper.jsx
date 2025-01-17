import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import AllDiscounts from "../../components/discounts/AllDiscounts";

const AllDiscountsWrapper = () => {
  return (
    <>
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <AllDiscounts />
      </div>
    </>
  );
};

export default AllDiscountsWrapper;
