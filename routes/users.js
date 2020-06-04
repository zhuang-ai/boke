const express = require('express');
const router = express.Router();
const user = require("../biz/user")
/* GET users listing. */
router.post('/login', function(req, res) {
  user.login(req,res)
});
router.post('/regist', function(req, res) {
    user.register(req,res)
});
module.exports = router;
