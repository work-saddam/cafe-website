const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const forgetPasswordRoute = require("./routes/forget_password");
const resetPasswordRoute = require("./routes/reset_password");
const orderRoute = require("./routes/orders");
const myOrder = require("./routes/my_order");
const allOrder= require("./routes/all_order")
const orderStatus = require("./routes/order_status")

// Database connection
connectDB;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forgot_password", forgetPasswordRoute);
app.use("/api/reset_password", resetPasswordRoute);
app.use("/api/orders", orderRoute);
app.use("/api/myorder", myOrder);
app.use("/api/allorder", allOrder)
app.use("/api/order_status", orderStatus);


// app.use("/", (req, res) => {
//   res.send("Home Page");
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
