const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
module.exports.product = async (req, res) => {

  const products = await Product.find().populate("categories").exec()
  product =JSON.parse(JSON.stringify(products))

  
 for (const iterator of products) {
  console.log(iterator.categories[0].cat_name)

 }
    
  
  res.render("admin/product/product", {
    products:products
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