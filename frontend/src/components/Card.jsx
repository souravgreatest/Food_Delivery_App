import React, { useRef, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate=useNavigate();
  const dispatch = useDispatchCart();
  let data = useCart();

  let sizes = props.options;
  let item_options = Object.keys(sizes);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(Object.keys(props.options)[0]);
  const priceRef = useRef();

  let totalPrice = quantity * parseInt(sizes[size]);

  const handleAddToCart = async () => {
    if(localStorage.getItem("token")===null)
    {
      navigate("/login");
      // alert("Please login first!!");
      return;
    }
    let food = null;
    for (let item of data) {
      if (item.id === props.filterItem._id) {
        food = item;
        break;
      }
    }

    if (food !== null) {
      await dispatch({
        type: "Update",
        id: props.filterItem._id,
        price: totalPrice,
        quantity: quantity,
      });
      return;
    } else {
      await dispatch({
        type: "Add",
        id: props.filterItem._id,
        name: props.filterItem.name,
        price: totalPrice,
        quantity: quantity,
        size: size,
      });
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-10 d-flex justify-content-center my-3">
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "100%", // Still 100% of its column
          maxWidth: "45rem", // Significantly increased max-width for much wider cards
          minHeight: "450px", // Slightly increased minHeight to balance the new width
          backgroundColor: "#343a40",
          borderRadius: "15px",
          color: "#f8f9fa",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 5px 10px rgba(0,0,0,0.2)";
        }}
      >
        <img
          src={props.filterItem.img}
          className="card-img-top"
          alt={props.filterItem.name}
          style={{
            height: "220px", // Increased image height to match the new proportions
            objectFit: "cover",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between p-4">
          <h5 className="card-title text-warning mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
            {props.filterItem.name}
          </h5>
          <p className="card-text text-white small mb-3 flex-grow-1">
            Delicious meal option.
          </p>
          <div className="container w-100 d-flex align-items-center gap-2 mb-3">
            <select
              className="form-select bg-dark text-white border-warning p-1 rounded-3"
              onChange={(e) => setQuantity(e.target.value)}
              style={{ flex: 1, cursor: "pointer" }}
            >
              {Array.from(Array(6), (ele, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="form-select bg-dark text-white border-warning p-1 rounded-3"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
              style={{ flex: 1, cursor: "pointer" }}
            >
              {item_options.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <hr className="my-2 border-secondary" />
          <div className="d-flex justify-content-between align-items-center">
            <div className="fs-5 fw-bold text-warning">₹{totalPrice}/-</div>
            <button
              className="btn btn-warning fw-bold px-3 py-2"
              onClick={handleAddToCart}
              style={{
                transition: "all 0.3s ease-in-out",
                borderRadius: "8px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e0a800";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#ffc107";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;