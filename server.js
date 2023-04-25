const express = require("express");
const app = express();

const db = require("./DBconnect");
const pizzaModel = require("./model/pizzaModel");
const userModel = require("./model/userModel");

app.use(express.json());

const pizzaRoute = require("./controller/pizzaRoute");
const userRoute = require("./controller/userRoute");

app.use("/api/pizza/", pizzaRoute);
app.use('/api/user/', userRoute);

app.get("/", (req, res) => {
  res.send("Port: " + port);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
