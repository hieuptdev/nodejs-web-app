const {
  Router
} = require("express");
const router = Router();
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
})


//Admin
const AdminController = require("../app/controller/admin/index.controller");
const ProductController = require("../app/controller/admin/product.controller");
const UserController = require("../app/controller/admin/user.controller");
const CategoryController = require("../app/controller/admin/category.controller");
const ConfigController = require("../app/controller/admin/config.controller")




//Test
const Test = require("../app/controller/admin/test.js");
router.get("/test", Test.test);
router.get("/test/update/", Test.update)
//Client
const HomeController = require("../app/controller/client/index.controller");
const ShopController = require("../app/controller/client/shop.controller");
const CartController = require("../app/controller/client/cart.controller")
//Middlewares
const CheckLogin = require("../app/middlewares/check-login")
const CheckLogout = require("../app/middlewares/check-logout");
const {
  route
} = require("./api");
//

//BackEnd

//Admin
router
  .route("/login")
  .get(CheckLogin, AdminController.login)
  .post(CheckLogin, AdminController.postLogin);
router.use("/admin", CheckLogout)
router.get("/logout", AdminController.logout)
//Product
router.get("/admin/product", ProductController.product);

router
  .route("/admin/product/add_product")
  .get(ProductController.add_product)
  .post(upload.single("prd_image"), ProductController.store);

router.get("/admin", AdminController.dashboard);

router
  .route("/admin/product/edit_product/:id")
  .get(ProductController.edit_product)
  .post(upload.single("prd_image"), ProductController.update)

router.get("/admin/product/del_product/:id", ProductController.del_product);

//User
router.get("/admin/user", UserController.user);
router
  .route("/admin/user/add_user")
  .get(UserController.add_user)
  .post(UserController.store);
router.get("/admin/user/edit_user/:id", UserController.edit_user);
router.get("/admin/user/del_user/:id", UserController.del_user);

//Category
router.get("/admin/category", CategoryController.category);
router.get("/admin/category/add_category", CategoryController.add_category);
router.get("/admin/category/edit_category", CategoryController.edit_category);
router.get("/admin/category/del_category", CategoryController.del_category);

//Configuration
router.get("/admin/config", ConfigController.config)

//FrontEnd
router.get("/", HomeController.index);
router.get("/cart", CartController.cart);
module.exports = router;
router.use("/admin", CheckLogout)