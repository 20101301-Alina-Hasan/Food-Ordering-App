const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://alina_hasan:12345@foodorderingdb.hu7llzp.mongodb.net/FoodOrderingDB?retryWrites=true&w=majority", {useNewUrlparser: true}
  )
  .then(() => console.log("DBconnection successful!")).catch((err)=>console.log(err));

module.exports = mongoose;
