const mongoose = require("mongoose");
require("../app/model/category");
require("../app/model/product")
require("../app/model/user")
const uris = "mongodb://127.0.0.1:27017/vietpro_mobile_shop";

mongoose.connect(uris);