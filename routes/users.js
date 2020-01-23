var express = require('express');
var router = express.Router();

const sql = require("./../mongo/sql");
const coll = require("./../mongo/users")

/* GET users listing. */
router.get('/', function (req, res, next) {
  sql.find({
    colName: coll
  }).then(data => {
    res.render("users", {
      activeIndex: 2,
      data
    })
  })
});

router.get("/addSub", function (req, res, next) {
  res.render("users_add", {
    activeIndex: 2
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
      sql.insert({
        colName: coll,
        data: req.body
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

module.exports = router;