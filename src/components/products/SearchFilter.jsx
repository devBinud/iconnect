import React, { useState } from "react";

const SearchFilter = ({ onFilter }) => {
  const [search, setSearch] = useState(""); // State for search term

  const handleFilter = () => {
    // Pass filter criteria to the parent component
    onFilter({ search });
  };

  return (
    <div className="mb-3">
      <div className="row">
        {/* Search Filter */}
        <div className="col-md-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Company, or Price"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={handleFilter} // Trigger filter on typing
            />
            <span className="input-group-text">
            <i class="icon-search menu-icon"></i> {/* Bootstrap search icon */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
 