const mongoose = require("./db");
module.exports = mongoose.model("goods", new mongoose.Schema({
    goodId: {
        type: String
    },
    brand: {
        type: String
    },
    logo: {
        type: String
    },
    proName: {
        type: String
    },
    proImg: {
        type: String
    },
    inPrice: {
        type: Number
    },
    outPrice: {
        type: Number
    },
    saleNum: {
        type: Number
    },
    stock: {
        type: Number
    },
    hot: {
        type: Number
    },
}))