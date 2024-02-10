import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import api from "..//api";

const App = () => {
  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const [amazonCharges, setAmazonCharges] = useState([]);

  const fetchAmazonCharges = async () => {
    const response = await api.get("/amazon_charges/");
    setAmazonCharges(response.data);
  };

  useEffect(() => {
    fetchAmazonCharges();
  }, []);

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
                    {amazonCharges.map((amazonCharge) => (
                      <tr key={amazonCharge.id}>
                        <td>{amazonCharge.date}</td>
                        <td>{amazonCharge.category}</td>
                        <td>{currencyFormat(amazonCharge.amount)}</td>
                        <td>{amazonCharge.chase_card ? "Yes" : "No"}</td>
                        <td>{amazonCharge.amazon_card ? "Yes" : "No"}</td>
                        <td>{amazonCharge.description}</td>
                        <td>{amazonCharge.paid ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Totals:</td>
                      <td>-</td>
                      <td>
                        {currencyFormat(
                          amazonCharges.reduce((acc, item) => {
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
