const mongoose = require("mongoose");

const CategoryModel = new mongoose.Schema({
  cat_name: String,
});

mongoose.model("Category", CategoryModel, "Category");