import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/user.js";
import Order from "../models/orders.js";

const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({});
    // console.log(orders);
    res.status(201).json({
      status: "success",
      message: "Fetched data successfully",
      orders,
    });
  } catch (err) {
    console.log("Failed to fetch data from DB", err);
    res.status(500).json({
      status: "false",
      message: "Failed to fetch data from DB",
      error: err.message,
    });
  }
});

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date }); // Insert order_date at index 0

    const existingOrder = await Order.findOne({ email: req.body.email });

    if (!existingOrder) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });

      return res
        .status(201)
        .json({ success: true, message: "Order created for new user" });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );

      return res
        .status(201)
        .json({ success: true, message: "Order added to existing user" });
    }
  } catch (error) {
    console.error("Order error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({status:"fail", message: "Please fill all the fields" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(401).json({status:"fail", message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({status:"fail", message: "Invalid password" });
    }

    const token = await jwt.sign({ email: email }, process.env.JWT_Secret, {expiresIn: "1h",});

    res.status(201).json({
        status: "success",
        message: "Login successful",
        token,
        user
    });
});

router.post("/register", async (req, res) => {
    const { name, password, email, location } = req.body;
    if (!name || !password || !email || !location) {
        return res.status(401).json({status:"fail", message: "Please fill all the fields" });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return res.status(402).json({status:"fail", message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    if (!hashedPassword) {
        return res.status(403).json({status:"fail", message: "Error hashing password" });
    }

    try {
        const user_data = await Users.create({
            name,
            password: hashedPassword,
            email,
            location,
        })

        const token = await jwt.sign({ email: email }, process.env.JWT_Secret, {expiresIn: "1h",});
        
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            token,
            user_data
        });

        

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;