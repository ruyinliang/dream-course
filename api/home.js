const express = require("express");
const router = express.Router();
const { HomeController } = require('../controllers');

router.get('/', HomeController.requestContent)

module.exports = router;