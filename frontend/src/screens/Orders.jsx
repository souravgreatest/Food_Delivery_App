import axios from "axios";
import React, { useState } from "react";

const Orders = () => {
  const [items, setItems] = useState([]);

  const solve = async () => {
    try {
        const email = JSON.parse(localStorage.getItem("user"));
        console.log("Parsed email:", email);
        
      console.log("Email from localStorage:", email);

      const response = await axios.get(
        "http://localhost:5000/api/auth/orders",
        {
          params: { email },
        }
      );
      console.log("Response data:", response.data);
      setItems(response.data.orders || response.data);

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={solve}>
        Check Orders
      </button>
      {items.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted">No orders to display</p>
      )}
    </div>
  );
};

export default Orders;
