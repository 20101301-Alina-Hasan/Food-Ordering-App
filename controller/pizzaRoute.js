const express = require("express");
const router = express.Router();
const Pizza = require("../model/pizzaModel");

router.get("/getPizza", async (req, res) => {
  try {
    const pizza = await Pizza.find({});
    res.send(pizza);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.post("/add", async (req, res) => {
  const { name, size, prices, category, image, description } = req.body;
  const newPizza = new Pizza({
    name,
    size,
    prices,
    category,
    image,
    description,
  });
  try {
    const pizza = await newPizza.save();
    return res.status(201).json(pizza);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) {
      return res.status(404).send("Pizza not found");
    }
    return res.send(pizza);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedPizza) {
      res.json(updatedPizza);
    } else {
      res.status(404).json({ message: "Pizza not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

