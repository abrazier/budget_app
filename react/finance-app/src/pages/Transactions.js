import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import api from "..//api";

const App = () => {
  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const today = new Date();
  const date = today.setDate(today.getDate());
  const dateToday = new Date(date).toISOString().split("T")[0]; // yyyy-mm-dd

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTransactions = async () => {
    const response = await api.get("/transactions/");
    setTransactions(response.data);
  };

  const fetchCategories = async () => {
    const response = await api.get("/budget_categories/");
    setCategories(response.data);
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: 0,
    chase_card: false,
    amazon_card: false,
    description: "",
    paid: false,
  });

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  console.log(formData);

  const handleFormSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();
    await api.post("/transactions/", formData);
    fetchTransactions();
    setFormData({
      date: "",
      category: "",
      amount: 0,
      chase_card: false,
      amazon_card: false,
      description: "",
      paid: false,
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
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      onChange={handleInputChange}
                      value={FormData.date}
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
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      defaultValue={0.0}
                      step="any"
                      onChange={handleInputChange}
                      className="form-control"
                      id="amount"
                      name="amount"
                      value={FormData.amount}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="chase_card" className="form-label">
                      Chase Card
                    </label>
                    <input
                      type="checkbox"
                      style={{ width: "25px", padding: 0 }}
                      onChange={handleInputChange}
                      id="chase_card"
                      name="chase_card"
                      value={FormData.chase_card}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="amazon_card" className="form-label">
                      Amazon Card
                    </label>
                    <input
                      type="checkbox"
                      style={{ width: "25px", padding: 0 }}
                      onChange={handleInputChange}
                      id="amazon_card"
                      name="amazon_card"
                      value={FormData.amazon_card}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      onChange={handleInputChange}
                      name="description"
                      value={FormData.description}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="paid" className="form-label">
                      Paid
                    </label>
                    <input
                      type="checkbox"
                      style={{ width: "25px", padding: 0 }}
                      onChange={handleInputChange}
                      id="paid"
                      name="paid"
                      value={FormData.paid}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>

                <table className="table table-striped table-bordered table-hover mt-3">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Chase Card</th>
                      <th>Amazon Card</th>
                      <th>Description</th>
                      <th>Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.category}</td>
                        <td>{currencyFormat(transaction.amount)}</td>
                        <td>{transaction.chase_card ? "Yes" : "No"}</td>
                        <td>{transaction.amazon_card ? "Yes" : "No"}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.paid ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Totals:</td>
                      <td>-</td>
                      <td>
                        {currencyFormat(
                          transactions.reduce((acc, item) => {
                            return acc + item.amount;
                          }, 0)
                        )}
                      </td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
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
