import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import api from "..//api";

const App = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formaData, setFormData] = useState({
    year: "",
    category: "Restaurants",
    budget: 0.0,
  });

  const fetchBudgets = async () => {
    const response = await api.get("/budget/");
    setBudgets(response.data);
  };

  const fetchCategories = async () => {
    const response = await api.get("/budget_categories/");
    setCategories(response.data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formaData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/budget/", formaData);
    fetchBudgets();
    setFormData({
      year: "",
      category: "Restaurants",
      budget: 0.0,
    });
  };

  return (
    <>
      <div>
        <div class="d-flex" id="wrapper">
          <Sidebar />
          {/* <!-- Page content wrapper--> */}
          <div id="page-content-wrapper">
            {/* <!-- Page content--> */}
            <div class="container-fluid">
              <div className="container">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3 mt-3">
                    <label htmlFor="year" className="form-label">
                      Year
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="year"
                      name="year"
                      onChange={handleInputChange}
                      value={FormData.year}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                      onChange={handleInputChange}
                      value={FormData.category}
                    >
                      {categories
                        ? categories.map((category) => {
                            return <option>{category.category}</option>;
                          })
                        : null}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="budget" className="form-label">
                      Budget
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="budget"
                      name="budget"
                      onChange={handleInputChange}
                      value={FormData.budget}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>

                <table className="table table-striped table-bordered table-hover mt-3">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Category</th>
                      <th>Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgets.map((budget) => (
                      <tr key={budget.id}>
                        <td>{budget.year}</td>
                        <td>{budget.category}</td>
                        <td>{budget.budget}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
