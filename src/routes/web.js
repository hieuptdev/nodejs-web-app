const {
  Router
} = require("express");
const router = Router();

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

//

//BackEnd

//Admin
router.get("/admin", AdminController.dashboard);
router
  .route("/login")
  .get(AdminController.login)
  .post(AdminController.postLogin);
//Product
router.get("/admin/product", ProductController.product);
router.get("/admin/product/add_product", ProductController.add_product);
router.get("/admin/product/edit_product", ProductController.edit_product);
router.get("/admin/product/del_product", ProductController.del_product)
//User
router.get("/admin/user", UserController.user);
router.get("/admin/user/add_user", UserController.add_user);
router.get("/admin/user/edit_user", UserController.edit_user);
router.get("/admin/user/del_user", UserController.del_user)
//Category
router.get("/admin/category", CategoryController.category);
router.get("/admin/category/add_category", CategoryController.add_category);
router.get("/admin/category/edit_category", CategoryController.edit_category);
router.get("/admin/category/del_category", CategoryController.del_category)

//Configuration
router.get("/admin/config", ConfigController.config)

//FrontEnd
router.get("/", HomeController.index);
module.exports = router;