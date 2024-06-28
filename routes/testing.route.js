const express = require("express");
const router = express.Router();
const { getAllMessages } = require("../controllers/testing.controller");

router.route("/messages").get(getAllMessages);
module.exports = router;
