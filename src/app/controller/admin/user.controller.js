const mongoose = require('mongoose')
const User = mongoose.model('User')
const joi = require('@hapi/joi');
module.exports.user = async (req, res) => {

  const page = req.query.page;
  const limit = 5;
  const skip = (page - 1) * limit;
  const totalDocument = await User.find().countDocuments()
  const totalPages = Math.ceil(totalDocument / limit)
  var pagePrev, pageNext
  if (page - 1 <= 0) {
    pagePrev = 1
  } else {
    pagePrev = page - 1
  }
  //
  if (page + 1 >= totalPages) {
    pageNext = totalPages
  } else {
    pageNext = page + 1
  }
  const users = await User.find().limit(limit).skip(skip)
  res.render("admin/user/user", {
    users,
    page,
    totalPages,
    pagePrev,
    pageNext
  });
};

module.exports.add_user = function (req, res) {

  res.render("admin/user/add_user");
};

module.exports.store = async function (req, res) {
  const bodySchema = joi.object({
    user_full: joi.string().required(),
    user_mail: joi.string().required(),
    user_pass: joi.required(),
    user_re_pass: joi.valid(joi.ref('user_pass')).required(),
    user_level: joi.number().required()
  }).unknown()
  value = await bodySchema.validateAsync(req.body).catch((err) => err)
  console.log(value);
  if (value instanceof Error) {
    return res.redirect("/admin/user/add_user")
  }
  console.log(Error)
  const user = new User({
    user_full: value.user_full,
    user_mail: value.user_mail,
    user_pass: value.user_pass,
    user_re_pass: value.user_re_pass,
    user_level: value.user_level
  })

  await user.save()
  res.redirect("/admin/user")
}

module.exports.edit_user = async function (req, res) {
  const user = await User.findById(req.params.id);

  res.render("admin/user/edit_user", {
    user
  });
};
module.exports.del_user = async function (req, res) {
  const {
    id
  } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.redirect("/admin/product")

  }
  const product = await User.findByIdAndDelete(id);
  res.redirect("/admin/user");
}