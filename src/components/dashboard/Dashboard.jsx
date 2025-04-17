import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import Main from '../main/Main';

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid page-body-wrapper">
         <Sidebar/>
         <Main/>
      </div>
    </>
  );
}

export default Dashboard
