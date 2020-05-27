const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    user_full: String,
    user_mails: String,
    user_pass: String,
    user_level: Number,
}, {
    timestamp: true,
})

mongoose.model("User", UserModel, "User")