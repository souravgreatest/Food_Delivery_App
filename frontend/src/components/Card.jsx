import React, { useRef, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const dispatch = useDispatchCart();
  let data = useCart();

  let sizes = props.options;
  let item_options = Object.keys(sizes);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(Object.keys(props.options)[0]);
  const priceRef = useRef();

  let totalPrice = quantity * parseInt(sizes[size]);

  const handleAddToCart = async () => {
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
    }
    else {
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
    <div className="col-md-3">
      <div
        className="card m-3 bg-dark text-white"
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <img
          src={props.filterItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title mx-3">{props.filterItem.name}</h5>
          <div className="container w-100 d-flex align-items-center gap-2">
            <select
              className="mx-1 p-1 rounded bg-danger text-white"
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from(Array(6), (ele, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="mx-1 p-1 rounded bg-danger text-white"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {item_options.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <div className="fs-5">₹{totalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-danger w-60 mt-1 mx-3 d-flex justify-content-center align-items-center"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
