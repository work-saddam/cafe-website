const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/database");
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

// Database connection
connectDB;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/", (req, res) => {
  res.send("Home Page");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
