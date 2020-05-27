const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
module.exports.product = async (req, res) => {
  // Product.find().exec(function (err, data) {
  //   res.render("admin/product/product", {
  //     //  Product: data
  //     Product: data,
  //     Category: data

  //   });
  // });
  const products = await Product.find()
  res.render("admin/product/product", {
    products
  })
}

// Product.find((err, Product) => {
//   Category.find((err, Category) => {
//     Console.log("Category", data)
//   })
// })
// res.render("admin/product/product", {
//   data: {
//     Product,
//     Category
//   }
// });



// module.exports.add_product = async (req, res) => {
// const Product =await Product.find()
// const Category =await Category.find()
// const category_0 = await Category.find({
//   _id: "5db7f9faa9da0856c7a4c631"
// })
// const category = await Category.findById("5db7f9faa9da0856c7a4c631")
// console.log(category_0);
// console.log(category);

// const product = new product({
//   cat_id: "5db7f9faa9da0856c7a4c631",
//   prd_name: "iPhone 11",
//   prd_image: "iphone-11.png",
//   prd_price: "20000000",
//   prd_warranty: "12 Tháng",
//   prd_accessories: "Sách, sạc, tai nghe",
//   prd_new: "Mới 100%",
//   prd_promotion: "Tấm dán màn hình 4D",
//   prd_status: 1,
//   prd_featured: 1,
//   prd_details: " iPhone 11 chính hãng"
// });
// product.save()
//   await Product.deleteMany({
//     _id: ["5db80537a9da0856c7a4c63b", "5db80537a9da0856c7a4c63c"]

//   })

//   res.render("admin/product/add_product", {
//     data: {
//       //  Product,
//       //  Category
//     }
//   });
// };
module.exports.add_product = (req, res) => {


  Product.find().limit(1).exec(function (err, data) {
    console.log(data);
    Category.find().limit(2).exec(function (err, data) {
      console.log(data);
      res.render("admin/product/add_product", {
        Category,
        Product
      })
    });
  })


}
module.exports.edit_product = (req, res) => {
  res.render("admin/product/edit_product");
};


module.exports.del_product = (req, res) => {
  res.render("test")
}