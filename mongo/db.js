const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/myapp");
let connection = mongoose.connection;
connection.on("connected", () => {
    console.log("connect ok");
})
connection.on("disconnected", () => {
    console.log("connect disconnected");
})
connection.on("error", () => {
    console.log("connect error");
})
module.exports = mongoose;