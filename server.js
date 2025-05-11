const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use("/", (req, res) => {
  res.send("Home Page");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
