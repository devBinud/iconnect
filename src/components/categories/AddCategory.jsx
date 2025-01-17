import React, { useState } from "react";
import Footer from "../footer/Footer";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import Constants from "../../constants/Constants";

const AddCategory = () => {
  const notify = () => {
    toast.success("Category added successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: categoryName,
      slug: slug,
    };
    axios
      .post("http://localhost:4000/api/category", formData)
      .then((response) => {
        console.log("Data successfully submitted");
        setCategoryName("");
        setSlug("");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const handleCategoryNameChange = (e) => {
    const name = e.target.value;
    setCategoryName(name);
    setSlug(name.toLowerCase().replace(/\s+/g, "-"));
  };

  return (
    <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div className="addNew__categories">
            <div class="col-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Add New Category</h4>
                  <p class="card-description">
                    Add only categories ,
                    <span className="text-danger"> Slug</span> will be generated
                    automatically
                  </p>
                  <div className="addNew__categoryForm">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-3">
                          <p
                            className="card-description"
                            style={{ margin: "4px 1px" }}
                          >
                            Category Name <span className="text-danger">*</span>
                          </p>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            value={categoryName}
                            onChange={handleCategoryNameChange}
                            placeholder="Enter Category Name"
                            style={{ padding: "0 10px" }}
                          />
                        </div>
                        <div className="col-md-3">
                          <p
                            className="card-description"
                            style={{ margin: "4px 1px" }}
                          >
                            Slug
                          </p>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            value={slug}
                            placeholder="Your Slug"
                            style={{ padding: "0 10px" }}
                            readOnly
                          />
                        </div>
                        <div className="col-md-3">
                          <p
                            className="card-description"
                            style={{ margin: "4px 1px" }}
                          >
                            Sub Category Name <span className="text-danger">*</span>
                          </p>
                          <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
                            placeholder="Enter Sub Category Name"
                            style={{ padding: "0 10px" }}
                          />
                        </div>
                        <div className="col-md-3">
                          <button
                            type="submit"
                            onClick={notify}
                            class="btn btn-primary"
                            style={{ marginTop: "27px" }}
                          >
                            Add Category
                          </button>
                          <ToastContainer />
                        </div>
                      </div>
                      <label htmlFor="category-name"></label>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AddCategory;
