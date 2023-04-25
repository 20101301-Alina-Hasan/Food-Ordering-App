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

router.post("/", async (req, res) => {
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

module.exports = router;
