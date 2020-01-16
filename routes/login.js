var express = require('express');
var router = express.Router();

const sql = require("./../mongo/sql");
const coll = require("./../mongo/user");

/* GET users listing. */
router.get('/', function (req, res, next) {
    let str = ""
    if (req.query.show) {
        str = `<div class="alert alert-danger alert-dismissible" style="position:absolute;left:0;right:0;top:0;margin:0 auto;text-align:center">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <h5><i class="icon fas fa-ban"></i> 登录失败,请检查用户名和密码</h5>
  </div>`;
    }
    res.render("login", {
        show: str
    })
});
router.post('/loginSub', function (req, res, next) {
    sql.find({
        colName: coll,
        where: {
            user: req.body.user,
            pass: req.body.pass
        }
    }).then(data => {
        if (data.length >= 1) {
            res.redirect("/")
        } else {
            res.redirect("/login?show=1");
        }
    })
})

module.exports = router;