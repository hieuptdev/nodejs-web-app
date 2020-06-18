const mongoose = require("mongoose");
const Product =  mongoose.model("Product")

module.exports.index = async function (req, res) {
  const ProductFeatured=await Product.find({prd_featured:1}).limit(6).sort("-_id")
  res.render("index",{ProductFeatured});
};
