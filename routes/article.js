const express = require('express');
const router = express.Router();
const article = require("../biz/article")
/* GET users listing. */
router.post('/add', function(req, res) {
    article.add(req,res)
});
router.post('/xr', function(req, res) {
    article.xr(req,res)
});
router.post('/userName', function(req, res) {
    article.userName(req,res)
});
module.exports = router;
