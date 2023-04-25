const mongoose = require("mongoose");
const pizzaSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    size: { type: Array, required: true },
    prices: { type: Array, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

/* First parameter is the collection name & the second is the schema name */
const pizzaModel = mongoose.model("pizza", pizzaSchema);
module.exports = pizzaModel;
