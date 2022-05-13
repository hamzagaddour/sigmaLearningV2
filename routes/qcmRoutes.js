var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {getQcm, calculateScore} = require('../controllers/qcmController')

router.get('/getqcm/:courseId', getQcm)
router.post('/calculateScore', calculateScore)

module.exports = router;
