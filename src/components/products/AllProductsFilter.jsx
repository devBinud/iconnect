import React, { useState } from "react";

const AllProductsFilter = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState(""); // State for minimum price filter
  const [maxPrice, setMaxPrice] = useState(""); // State for maximum price filter
  const [search, setSearch] = useState(""); // State for search term
  const [startDate, setStartDate] = useState(""); // State for start date filter
  const [endDate, setEndDate] = useState(""); // State for end date filter

  const handleFilter = () => {
    // Pass filter criteria to the parent component
    onFilter({ minPrice, maxPrice, search, startDate, endDate });
  };

  return (
    <div className="mb-3">
      <div className="row">
        {/* Search Filter */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Company, Price, or IMEI"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleFilter} // Trigger filter on typing
          />
        </div>

        {/* Minimum Price Filter */}
        <div className="col-md-2 mt-lg-0 mt-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onKeyUp={handleFilter} // Trigger filter on typing
          />
        </div>

        {/* Maximum Price Filter */}
        <div className="col-md-2 mt-lg-0 mt-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyUp={handleFilter} // Trigger filter on typing
          />
        </div>

        {/* Start Date Filter */}
        <div className="col-md-2 mt-lg-0 mt-2">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onKeyUp={handleFilter} // Trigger filter on typing
          />
        </div>

        {/* End Date Filter */}
        <div className="col-md-2 mt-lg-0 mt-2">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onKeyUp={handleFilter} // Trigger filter on typing
          />
        </div>

        {/* Apply Filter Button */}
        <div className="col-md-1 mt-lg-0 mt-2">
          <button onClick={handleFilter} type="button" class="btn btn-primary btn-icon-text">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProductsFilter;