const mongoose = require("./db");
module.exports = mongoose.model("user", new mongoose.Schema({
    user: String,
    pass: String,
    email: String,
    userId: String
}))