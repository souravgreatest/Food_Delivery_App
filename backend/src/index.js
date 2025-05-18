// index.js or server.js
import express from "express";
import mongodb from "../db.js";
import cors from "cors";
import router from "../routes/auth.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.send("Checking server...");
});

app.post("/api/auth/foodData", (req, res) => {
  if (!global.foodData || !global.foodCategory) {
    return res.status(500).json({ message: "Data not loaded yet" });
  }
  res.send([global.foodData, global.foodCategory]);
});

// Start server after DB is ready
mongodb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });