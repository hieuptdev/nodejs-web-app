const mongoose = require("mongoose");

const CategoryModel = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    ref: "Product"
  },

  cat_name: String,
});

mongoose.model("Category", CategoryModel, "Category");