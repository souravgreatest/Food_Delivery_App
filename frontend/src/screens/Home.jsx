import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]); // Initializing as empty array
  const [foodItems, setFoodItems] = useState([]); // Initializing as empty array
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

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
      // console.log("dekho=",response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div className="bg-secondary">
      <Navbar />

      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="btn text-white bg-danger"
                onClick={() => {
                  setSearch("");
                }}
              >
                X
              </button>
            </div>
          </div>
          {/* Carousel items */}
          <div className="carousel-item active">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuHg9ekOVSaq4wdObgzKMrnWzbrHkd2vwsw&s"
              className="d-block w-100"
              style={{
                filter: "brightness(30%)",
                height: "600px",
                objectFit: "fill",
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2xzqpYHvcxbwFLV9E3J68iBp8R2s_PBcCZQ&s"
              className="d-block w-100"
              style={{
                filter: "brightness(30%)",
                height: "600px",
                objectFit: "fill",
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvvbgP_6YNPuW794r_cywymsTw9L-RqfUevg&s"
              className="d-block w-100"
              style={{
                filter: "brightness(30%)",
                height: "600px",
                objectFit: "fill",
              }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : Array.isArray(foodCat) && foodCat.length > 0 ? (
          foodCat.map((data, id) => {
            return (
              <div key={id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr
                  id="hr-success"
                  style={{
                    height: "4px",
                    backgroundImage:
                      "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                  }}
                />
                {Array.isArray(foodItems) && foodItems.length > 0 ? (
                  foodItems
                    .filter(
                      (items) =>
                        items.CategoryName === data.CategoryName &&
                        items.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems, idx) => (
                      <div key={idx} className="col-12 col-md-6 col-lg-3">
                        {/* {console.log(filterItems.name,filterItems.options[0],filterItems.img)} */}
                        <Card
                          filterItem={filterItems}
                          // item={filterItems}
                          options={filterItems.options[0]}
                          // ImgSrc={filterItems.img}
                        />
                      </div>
                    ))
                ) : (
                  <div>No Such Data</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No Categories Available</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
