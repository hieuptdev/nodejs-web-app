const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
const User = mongoose.model("User");

module.exports.test = function (req, res) {
    // const ProductInsert = new Product({
    //     cat_id: "5db7f9faa9da0856c7a4c631",
    //     prd_name: "iPhone 11",
    //     prd_image: "iphone-11.png",
    //     prd_price: "20000000",
    //     prd_warranty: "12 Tháng",
    //     prd_accessories: "Sách, sạc, tai nghe",
    //     prd_new: "Mới 100%",
    //     prd_promotion: "Tấm dán màn hình 4D",
    //     prd_status: 1,
    //     prd_featured: 1,
    //     prd_details: " iPhone 11 chính hãng"
    // }, {
    //     timestamp: true
    // })
    // ProductInsert.save()


    // Product.create({
    //     cat_id: "5db7f9faa9da0856c7a4c631",
    //     prd_name: "iPhone 11",
    //     prd_image: "iphone-11.png",
    //     prd_price: "20000000",
    //     prd_warranty: "12 Tháng",
    //     prd_accessories: "Sách, sạc, tai nghe",
    //     prd_new: "Mới 100%",
    //     prd_promotion: "Tấm dán màn hình 4D",
    //     prd_status: 1,
    //     prd_featured: 1,
    //     prd_details: " iPhone 11 chính hãng"
    // })


    // User.create({
    //     user_full: "Trung Hieu",
    //     user_mails: "hieupt.donganh@gmail.com",
    //     user_passwords: "123456",
    //     user_lever: "1",
    // })

    res.render('test')
}

module.exports.update = function (req, res) {
    // User.updateOne({
    //     _id: "5ecbca6db0568c2dfcb6183a"
    // }, {
    //     user_passwords: "123456"
    // }).exec();
    Product.updateMany({
        prd_warranty: "12 Tháng"
    }, {
        $set: {
            prd_warranty: "18 Tháng"
        }
    }).exec()
    res.render('test')

}