import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import axios from "axios";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="bg-dark text-white min-vh-100">
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("user");

    try {
      let response = await axios.post(
        "http://localhost:5000/api/auth/orderData",
        {
          order_data: data,
          email: userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Order Response:", response.data);

      if (response.status === 201) {
        dispatch({ type: "Drop" });
      }
      
    } catch (error) {
      console.error("Error during checkout:", error); 
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container mt-5 bg-dark text-white p-4 rounded">
      <style>{`
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          background-color: rgb(34,34,34) /* Dark row background */
          color: white;
        }

        .custom-table thead th {
          background-color: red;
          color: white;
          font-weight: bold;
          border: none;
        }

        .custom-table tbody tr {
          background-color: rgb(34,34,34)
        }

        .custom-table tbody tr:not(:last-child) {
          border-bottom: 2px solid white; /* Bold white horizontal line */
        }

        .custom-table td, .custom-table th {
          border: none;
          padding: 12px 8px;
        }

        .delete-icon {
          cursor: pointer;
          color: white;
          transition: 0.2s ease;
        }

        .delete-icon:hover {
          color: red;
        }
      `}</style>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td>
                  <svg
                    onClick={() => dispatch({ type: "Remove", index })}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-trash delete-icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-4">Total Price: ₹{totalPrice}/-</h3>

        <button className="btn btn-success mt-3" onClick={handleCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
}
