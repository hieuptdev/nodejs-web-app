const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    user_full: String,
    user_mail: String,
    user_pass: String,
    user_level: Number,
}, {
    timestamps: true,
})

mongoose.model("User", UserModel, "User")