const mongoose = require("./db");
module.exports = mongoose.model("order", new mongoose.Schema({
    userName: String,
    brand: String,
    proName: String,
    outPrice: Number,
    orderInfo: String
}))