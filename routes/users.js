var express = require('express');
var router = express.Router();

const sql = require("./../mongo/sql");
const coll = require("./../mongo/users")
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
      skip: index * pageNum
    }
  }).then(data => {
    sql.find({
      colName: coll
    }).then(all => {
      res.render("users", {
        activeIndex: 2,
        data,
        all,
        pageNum,
        index
      })
    })
  })
});

router.get("/addSub", function (req, res, next) {
  res.render("users_add", {
    activeIndex: 2
  })
})
router.get("/addMore", function (req, res, next) {
  let data = [];
  xlsx.parse("/media/retr0/新加卷1/Express/day03/myapp/addMore/usersMore.xls")[0].data.forEach((ele, idx) => {
    if (idx >= 1) {
      data.push({
        userId: uuid.v1(),
        userName: ele[0],
        pass: ele[1],
        phone: ele[2],
        email: ele[3],
        birthday: ele[4],
      })
    }
  })
  sql.insert({
    colName: coll,
    data
  }).then(data => {
    res.redirect("/users")
  })
})
router.post("/add", function (req, res, next) {
  sql.find({
    colName: coll,
    where: {
      userName: req.body.userName
    }
  }).then(data => {
    if (data.length < 1) {
      let obj = req.body;
      obj.userId = uuid.v1();
      sql.insert({
        colName: coll,
        data: obj
      }).then(() => {
        res.redirect("/users");
      })
    } else {
      res.redirect("/users/addSub");
    }
  })
})

router.get("/updateSub", function (req, res, next) {
  sql.find({
    colName: coll,
    where: req.query
  }).then(data => {
    res.render("users_update", {
      activeIndex: 2,
      data: data[0]
    })
  })
})

router.post("/update", function (req, res, next) {
  sql.update({
    colName: coll,
    where: {
      userId: req.body.userId
    },
    newdata: req.body
  }).then(() => {
    res.redirect("/users")
  })
})

router.get("/deleteSub", function (req, res, next) {
  sql.delete({
    colName: coll,
    where: req.query
  }).then(() => {
    res.redirect("/users");
  })
})
module.exports = router;