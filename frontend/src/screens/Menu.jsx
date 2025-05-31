import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default function Menu() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Search for Biryani...",
    "Find Butter Chicken...",
    "Discover South Indian delights...",
    "Explore vegetarian options...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#212529",
        color: "#f8f9fa",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      

      <Navbar />

      <div
        className="position-relative text-center d-flex align-items-center justify-content-center"
        style={{
          height: "400px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://png.pngtree.com/thumb_back/fh260/background/20230706/pngtree-d-rendered-cartoon-fast-food-deliciously-tempting-treats-at-a-restaurant-image_3804314.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold text-warning mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)', fontFamily: 'Pacifico, cursive' }}>
            Savor the Flavors of India
          </h1>
          <p className="lead mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
            Order delicious meals from your favorite local restaurants.
          </p>
          <div className="d-flex justify-content-center">
            <div className="input-group w-75">
              <input
                className="form-control bg-dark text-white border-warning" 
                type="search"
                placeholder={search || placeholders[placeholderIndex]}
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{
                  backgroundColor: '#495057',
                  color: '#f8f9fa',
                  borderColor: '#ffc107',
                  padding: '1rem 1.25rem',
                  fontSize: '1.1rem',
                  borderRadius: search ? '0.375rem 0 0 0.375rem' : '0.375rem',
                }}
              />
              {search && (
                <button
                  className="btn btn-outline-warning text-dark fw-bold px-3"
                  onClick={() => {
                    setSearch("");
                  }}
                  style={{
                    backgroundColor: '#ffc107',
                    border: '1px solid #ffc107',
                    color: '#212529',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading delicious food...</p>
          </div>
        ) : Array.isArray(foodCat) && foodCat.length > 0 ? (
          foodCat.map((data, id) => (
            <div key={id} className="mb-4">
              <div className="fs-2 fw-bold m-3 text-warning" style={{ fontFamily: 'Pacifico, cursive', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                {data.CategoryName}
              </div>
              <hr
                className="my-3"
                style={{
                  height: "3px",
                  border: "none",
                  background: "linear-gradient(to right, #ffc107, transparent)",
                }}
              />
              <div className="row ">
                {Array.isArray(foodItems) && foodItems.length > 0 ? (
                  foodItems
                    .filter(
                      (items) =>
                        items.CategoryName === data.CategoryName &&
                        items.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems, idx) => (
                      <div key={idx} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
                        <Card
                          filterItem={filterItems}
                          options={filterItems.options[0]}
                        />
                      </div>
                    ))
                ) : (
                  <div className="text-center text-muted">No items available in this category.</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center my-5 text-muted">No food categories available.</div>
        )}
      </div>

      <Footer />
    </div>
  );
}