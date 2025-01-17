import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import AddDiscounts from '../../components/discounts/AddDiscounts';

const AddDiscountsWrapper = () => {
  return (
    <>
    <div className="container-fluid page-body-wrapper">
       <Sidebar/>
       <AddDiscounts/>
    </div>
    </>
  )
}

export default AddDiscountsWrapper;
