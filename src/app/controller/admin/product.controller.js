const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
const fs = require('fs')
const path = require('path');
const joi = require('@hapi/joi');

module.exports.add_product = async (req, res) => {
  const categories = await Category.find();

  res.render("admin/product/add_product", {
    data: {
      categories
    }
  })
}

module.exports.store = async (req, res) => {

  const file = req.file;
  console.log("Add", file)

  const pathUpload = path.resolve("src", "public", "theme", "img", "products")
  const contentFile = fs.readFileSync(file.path)
  fs.unlinkSync(file.path)
  fs.writeFileSync(path.join(pathUpload, file.originalname), contentFile)

  const bodySchema = joi.object({
    prd_name: joi.string().required(),
    prd_price: joi.number().required(),
    prd_warranty: joi.required()
  }).unknown()
  value = await bodySchema.validateAsync(req.body).catch((err) => err)
  console.log(value);

  if (value instanceof Error) {

    return res.redirect("/admin/product/add_product")
  }


  const product = new Product({
    prd_name: value.prd_name,
    cat_id: value.cat_id,
    prd_image: file.originalname,
    prd_price: value.prd_price,
    prd_warranty: value.prd_warranty,
    prd_accessories: value.prd_accessories,
    prd_new: value.prd_new,
    prd_promotion: value.prd_promotion,
    prd_status: value.prd_status,
    prd_featured: value.prd_featured,
    prd_details: value.prd_details,
  })
  await product.save()
  return res.redirect("/admin/product")

}

module.exports.product = async (req, res) => {

  const page = req.query.page;
  const limit = 5;
  const skip = (page - 1) * limit;
  const totalDocument = await Product.find().countDocuments()
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
  // const range = [];
  // const delta = 2;
  // const left = page - delta;
  // const right = page + delta;
  // const rangerForDot = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   if (i === 1 || i === totalPages || (i >= left && i <= right)) {
  //     range.push(i);
  //   }
  // }
  // let temp;
  // range.map((i) => {
  //   if (i - temp === 2) {
  //     rangerForDot.push(i - 1)

  //   } else if (i - temp !== 1) {
  //     rangerForDot.push("...")
  //   }
  //   temp = i;
  //   rangerForDot.push(i)
  // })
  const products = await Product.find().populate({
    path: "cat_id",
  }).limit(limit).skip(skip).sort("-_id")
  res.render("admin/product/product", {
    products,
    // range: rangerForDot,
    page,
    totalPages,
    pagePrev,
    pageNext
  })
}


module.exports.edit_product = async (req, res) => {
  const {
    id
  } = req.params
  const file = req.file;
  const categories = await Category.find();
  const product = await Product.findById(id)

  res.render("admin/product/edit_product", {
    data: {
      categories,
      product
    }
  });
};



module.exports.update = async (req, res) => {
  const file = req.file;
  const {
    id
  } = req.params;
  if (file) {
    const pathUpload = path.resolve("src", "public", "theme", "img", "products")
    const contentFile = fs.readFileSync(file.path)
    fs.unlinkSync(file.path)
    fs.writeFileSync(path.join(pathUpload, file.originalname), contentFile)
  }
  const bodySchema = joi.object({
    prd_name: joi.string().required(),
    prd_price: joi.number().required(),
    prd_warranty: joi.required()
  }).unknown()
  value = await bodySchema.validateAsync(req.body).catch((err) => err)
  console.log(value);

  if (value instanceof Error) {

    return res.redirect(req.path)
  }


  const productUpdate = {
    prd_name: value.prd_name,
    cat_id: value.cat_id,
    prd_price: value.prd_price,
    prd_warranty: value.prd_warranty,
    prd_accessories: value.prd_accessories,
    prd_new: value.prd_new,
    prd_promotion: value.prd_promotion,
    prd_status: value.prd_status,
    prd_featured: value.prd_featured,
    prd_details: value.prd_details,
  }
  if (file) {
    productUpdate["prd_image"] = file.originalname
  }
  await Product.updateOne({
    _id: id
  }, productUpdate)
  return res.redirect("/admin/product")

}


module.exports.del_product = async (req, res) => {
  const {
    id
  } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.redirect("/admin/product")
  }
  const product = await Product.findByIdAndDelete(id);
  if (product) {
    const pathUpload = path.resolve("src", "public", "theme", "img", "products")
    if (fs.existsSync(path.join(pathUpload, product.prd_image))) {
      fs.unlinkSync(path.join(pathUpload, product.prd_image))
    }
  }
  console.log("Delete", product.prd_name)
  return res.redirect("/admin/product")
}