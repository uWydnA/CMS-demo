var express = require('express');
var router = express.Router();

const uuid = require("node-uuid");
const coll = require("./../mongo/goods");
const sql = require("./../mongo/sql");
const xlsx = require("node-xlsx");

/* GET users listing. */
router.get('/', function (req, res, next) {
    let index = parseInt(req.query.index) || 0;
    let limitNum = 5;
    let setting = {
        limit: 5,
        skip: index
    }
    if (req.query.type) {
        let obj = {};
        obj[req.query.type] = req.query.d;
        setting = {
            limit: 5,
            skip: index,
            sort: obj
        }
    }
    sql.find({
        colName: coll,
        setting: setting
    }).then((data) => {
        sql.find({
            colName: coll,
        }).then((fenye) => {
            res.render("goods", {
                data,
                fenye,
                fenyeIndex: (limitNum - 0) + (index - 0),
                activeIndex: 1,
            })
        })
    }, (err) => {
        console.log(err)
    })
});
router.get("/next", function (req, res, next) {
    if (parseInt(req.query.fenyeIndex) >= parseInt(req.query.fenye)) {
        req.query.fenyeIndex = 0;
    }
    res.redirect(`/goods?index=${req.query.fenyeIndex}`)
})
router.get("/fenyeNum", function (req, res, next) {
    res.redirect(`/goods?index=${req.query.index*5}`)
})
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
router.get('/sort', function (req, res, next) {
    res.redirect(`/goods?index=${req.query.index}&type=${req.query.type}&d=${req.query.d}`)
})
router.get('/upload', function (req, res, next) {
    let arr = [];
    xlsx.parse('/media/retr0/新加卷1/APP/feiq/Recv Files/三阶段/课件/day04/后台信息管理系统_files/pro.xls')[0].data.forEach((data, idx) => {
        if (idx > 0) {
            let obj = {
                goodId: uuid.v1(),
                brand: data[0],
                logo: data[1],
                proName: data[2],
                proImg: data[3],
                inPrice: data[4],
                outPrice: data[5],
                saleNum: data[6],
                stock: data[7],
                hot: data[8],
            }
            arr.push(obj);
        }
    });
    // res.send(arr)
    sql.insert({
        colName: coll,
        data: arr
    }).then(() => {
        res.redirect("/goods");
    })
})

module.exports = router;