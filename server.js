const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path")
const favicon = require("serve-favicon")

const connectDB = require("./config/database");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const forgetPasswordRoute = require("./routes/forget_password");
const resetPasswordRoute = require("./routes/reset_password");
const orderRoute = require("./routes/orders");
const myOrder = require("./routes/my_order");
const allOrder= require("./routes/all_order")
const orderStatus = require("./routes/order_status")
const checkAuth = require("./middleware/check_auth")
const checkAdmin = require("./middleware/check_admin")

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
app.use("/api/forget_password", forgetPasswordRoute);
app.use("/api/reset_password", resetPasswordRoute);
app.use("/api/orders", orderRoute);
app.use("/api/myorder", myOrder);
app.use("/api/allorder", allOrder)
app.use("/api/order_status", orderStatus);


app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use('/', express.static(path.join(__dirname, './client')))

app.get('/forget_password', (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/forget_password.html'))
});
app.get('/reset_password', (req, res, next) => {
  // console.log(req.query);
  res.sendFile(path.join(__dirname, './client/reset_password.html'))
});

app.get('/main', (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/main/index.html'))
});

app.get('/myorder',checkAuth, (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/main/my_order.html'))
});
app.get('/allorder',checkAdmin, (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/main/all_order.html'))
});

app.get('/logout', (req, res, next) => {
  res.clearCookie("mytoken");
  res.clearCookie("myemail");
  res.redirect('/');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
