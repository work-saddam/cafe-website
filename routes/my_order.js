const router = require("express").Router();
const { Order } = require("../models/order");
const checkAuth = require("../middleware/check_auth");

router.post("/", checkAuth, async (req, res) => {
  try {
    const myemail = req.cookies.myemail;

    const orders = await Order.find({ email: myemail });
    return res.status(200).json(orders);
  } catch (error) {
    return res.json({ status: "error", error: "Internal Server Error" });
  }
});

module.exports = router;
