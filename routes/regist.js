var express = require('express');
var router = express.Router();

const coll = require("../mongo/user");
const sql = require("../mongo/sql");
const uuid = require("node-uuid");

/* GET users listing. */
router.get('/', function (req, res, next) {
    let str = "";
    if (req.query.show) {
        str = `<div class="alert alert-danger alert-dismissible" style="position:absolute;left:0;right:0;top:0;margin:0 auto;text-align:center">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h5><i class="icon fas fa-ban"></i> 用户名重复</h5>
        
      </div>`;
    }
    res.render("regist", {
        show: str
    })
});
router.get('/registSub', function (req, res, next) {
    sql.find({
        colName: coll,
        where: {
            user: req.query.user
        }
    }).then((data) => {
        let obj = req.query;
        if (data.length < 1) {
            obj.userId = uuid.v1();
            sql.insert({
                colName: coll,
                data: obj
            }).then(() => {
                res.redirect("/login");
            })
        } else {
            res.redirect("/regist?show=1");

        }
    })
})

module.exports = router;