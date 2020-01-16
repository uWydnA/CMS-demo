var express = require('express');
var router = express.Router();

const uuid = require("node-uuid");
const coll = require("./../mongo/product");
const sql = require("./../mongo/sql");

/* GET users listing. */
router.get('/', function (req, res, next) {
    sql.find({
        colName: coll,
    }).then((data) => {
        res.render("goods", {
            data,
            activeIndex: 1,

        })
    }, (err) => {
        console.log(err)
    })
});
router.get('/add', function (req, res, next) {
    res.render("goods_add", {
        activeIndex: 1
    })
})
router.get('/delete', function (req, res, next) {
    sql.delete({
        colName: coll,
        where: req.query
    }).then(() => {
        res.redirect("/goods")
    })
})
router.get('/update', function (req, res, next) {
    sql.find({
        colName: coll,
        where: req.query
    }).then((data) => {
        res.render("goods_update", {
            activeIndex: 1,
            data: data[0]
        })
    })

})
router.post('/updateSub', function (req, res, next) {
    let arr = req.body;
    arr.inPrice = arr.inPrice - 0;
    arr.outPrice = arr.outPrice - 0;
    arr.saleNum = arr.saleNum - 0;
    arr.stock = arr.stock - 0;
    arr.hot = arr.hot - 0;
    sql.update({
        colName: coll,
        where: {
            goodId: arr.goodId
        },
        newdata: arr
    }).then(() => {
        res.redirect("/goods");
    })
})
router.post('/addSub', function (req, res, next) {
    let arr = req.body;
    arr.inPrice = arr.inPrice - 0;
    arr.outPrice = arr.outPrice - 0;
    arr.saleNum = arr.saleNum - 0;
    arr.stock = arr.stock - 0;
    arr.hot = arr.hot - 0;
    arr.goodId = uuid.v1();
    sql.insert({
        colName: coll,
        data: arr
    }).then(() => {
        res.redirect("/goods");
    }, (err) => {
        console.log(err)
    })
})


module.exports = router;