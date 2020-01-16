var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render("regist", {})
});
router.get('/registSub', function (req, res, next) {
    res.send(req.query)
})

module.exports = router;