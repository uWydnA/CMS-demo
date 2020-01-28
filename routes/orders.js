var express = require('express');
var router = express.Router();

const sql = require("./../mongo/sql");
const coll = require("./../mongo/order")
const collUsers = require("./../mongo/users")
const uuid = require("node-uuid");
const xlsx = require("node-xlsx");

let index = 0;
let pageNum = 5;
/* GET users listing. */
router.get('/', function (req, res, next) {
    sql.find({
        colName: coll,
        setting: {
            limit: pageNum,
            skip: index * pageNum || 0
        }
    }).then(data => {
        sql.find({
            colName: coll
        }).then(all => {
            res.render("order", {
                activeIndex: 3,
                data,
                all,
                pageNum,
                index
            })
        })
    })
});

router.get("/addSub", function (req, res, next) {
    res.render("order_add", {
        activeIndex: 3
    })
})
router.get("/addMore", function (req, res, next) {
    let data = [];
    xlsx.parse("/media/retr0/新加卷1/Express/day03/myapp/addMore/orderMore.xls")[0].data.forEach((ele, idx) => {
        if (idx >= 1) {
            data.push({
                orderInfo: uuid.v1(),
                userName: ele[0],
                brand: ele[1],
                proName: ele[2],
                outPrice: ele[3],
            })
        }
    })
    sql.insert({
        colName: coll,
        data
    }).then(data => {
        res.redirect("/order")
    })
})
router.post("/add", function (req, res, next) {
    let obj = req.body;
    obj.orderInfo = uuid.v1();
    sql.insert({
        colName: coll,
        data: obj
    }).then(() => {
        res.redirect("/order");
    })
})

router.get("/updateSub", function (req, res, next) {
    sql.find({
        colName: collUsers,
        where: req.query
    }).then(data => {
        res.render("order_update", {
            activeIndex: 3,
            data: data[0]
        })
    })
})

router.post("/update", function (req, res, next) {
    sql.update({
        colName: coll,
        where: {
            userName: req.body.userName
        },
        newdata: req.body
    }).then(() => {
        res.redirect("/order")
    })
})

router.get("/deleteSub", function (req, res, next) {
    sql.delete({
        colName: coll,
        where: req.query
    }).then(() => {
        res.redirect("/order");
    })
})

router.get("/next", function (req, res, next) {
    if (parseInt(req.query.index) >= Math.floor(req.query.data / pageNum)) {
        index = 0
    } else {
        index++;
    }
    res.redirect(`/order`)
})

router.get("/fenyeNum", function (req, res, next) {
    index = req.query.fenyeNum;
    res.redirect(`/order`)
})
module.exports = router;