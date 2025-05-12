const router = require("express").Router();
const { Order } = require("../models/order");
const checkAuth = require("../middleware/check_auth");
const checkAdmin = require("../middleware/check_admin");

router.post("/", checkAuth, checkAdmin, async (req, res) => {
  try {
    const allOrders = await Order.find({});
    return res.status(200).json(allOrders);
  } catch (error) {
    return res.json({ status: "error", error: "Internal Server Error" });
  }
});

module.exports = router;
