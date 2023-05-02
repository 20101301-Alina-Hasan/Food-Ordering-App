const express = require("express");
const app = express();

const db = require("./DBconnect");
const pizzaModel = require("./model/pizzaModel");
const userModel = require("./model/userModel");

app.use(express.json());

const pizzaRoute = require("./controller/pizzaRoute");
const userRoute = require("./controller/userRoute");

app.use("/api/pizza/", pizzaRoute);
app.use("/api/user/", userRoute);

app.get("/", (req, res) => {
  res.send("Port: " + port);
});

app.put("/api/pizza/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedPizza = await pizzaModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedPizza) {
      res.json(updatedPizza);
    } else {
      res.status(404).json({ message: "Pizza not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.delete("/api/pizza/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPizza = await pizzaModel.deleteOne({ _id: id });
    if (deletedPizza.deletedCount === 1) {
      res.json({ message: "Pizza deleted successfully" });
    } else {
      res.status(404).json({ message: "Pizza not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
