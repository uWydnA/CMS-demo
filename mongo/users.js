const mongoose = require("./db");
module.exports = mongoose.model("usersInfo", new mongoose.Schema({
    userName: String,
    pass: String,
    email: String,
    userId: String,
    birthday: String,
    phone: Number
}))