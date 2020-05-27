const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports.user = async (req, res) => {
  const users = await User.find();
  res.render("admin/user/user", {
    users
  });
};

module.exports.add_user = function (req, res) {
  res.render("admin/user/add_user");
};

module.exports.edit_user = function (req, res) {
  res.render("admin/user/edit_user");
};
module.exports.del_user = function (req, res) {
  res.render("test");
}