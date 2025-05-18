// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully!!");

    const db = mongoose.connection.db;

    // for getting the data collections from database
    const foodItems = await db.collection("food_items").find({}).toArray();
    const foodCategories = await db
      .collection("food_category")
      .find({})
      .toArray();

    // Set to global
    global.foodData = foodItems;
    global.foodCategory = foodCategories;

    console.log("Data fetched and globals set.");
  } catch (err) {
    console.error("Error in DB connection or data fetching:", err);
    throw err;
  }
};

export default mongodb;
