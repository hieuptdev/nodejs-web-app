const mongoose = require('mongoose')
const Category = mongoose.model("Category")
module.exports.category = async (req, res) => {
  const categorys = await Category.find()
  res.render("admin/category/category", {
    categorys
  });
};

module.exports.add_category = (req, res) => {
  res.render("admin/category/add_category");
};

module.exports.edit_category = (req, res) => {
  res.render("admin/category/edit_category");
};


module.exports.del_category = (req, res) => {
  res.render("test")
}