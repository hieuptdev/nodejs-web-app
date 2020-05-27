const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const User = mongoose.model("User");

module.exports.dashboard = function (req, res) {
  Category.find().exec(function (err, data) {

  });

  res.render("admin/page/dashboard");
};

module.exports.login = function (req, res) {
  res.render("admin/page/login", {
    error: ""
  });
};


module.exports.postLogin = async function (req, res) {
  const email = req.body.mail;
  const pass = req.body.pass;

  const user = await User.findOne({
    user_mails: email
  })
  let error;
  if (!user) {
    error = "Tài khoản không tồn tại"
  }
  if (!error && user.user_pass !== pass) {
    error="Mật khẩu không khớp"
  }
  if (!error) {
    return res.redirect("/admin")
  }
  res.render("admin/page/login", {
    error
  })

  // if (user) {
  //   if (user.user_pass === pass) {
  //     return res.redirect("/admin")
  //   }
  //   res.render("admin/page/login", {
  //     error: "Mật khẩu không hợp lệ"
  //   })
  // }
  // if (!user) {
  //   res.render("admin/page/login", {
  //     error: "Tài khoản không tồn tại"
  //   })
  // }



};