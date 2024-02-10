import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import api from "..//api";

const App = () => {
  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const [chaseCharges, setChaseCharges] = useState([]);

  const fetchChaseCharges = async () => {
    const response = await api.get("/chase_charges/");
    setChaseCharges(response.data);
  };

  useEffect(() => {
    fetchChaseCharges();
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
                    {chaseCharges.map((chaseCharge) => (
                      <tr key={chaseCharge.id}>
                        <td>{chaseCharge.date}</td>
                        <td>{chaseCharge.category}</td>
                        <td>{currencyFormat(chaseCharge.amount)}</td>
                        <td>{chaseCharge.chase_card ? "Yes" : "No"}</td>
                        <td>{chaseCharge.amazon_card ? "Yes" : "No"}</td>
                        <td>{chaseCharge.description}</td>
                        <td>{chaseCharge.paid ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Totals:</td>
                      <td>-</td>
                      <td>
                        {currencyFormat(
                          chaseCharges.reduce((acc, item) => {
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
