const express = require("express");
const router = express.Router();
const proxy = require("../controllers/proxy");
const restrictAccess = require("../middleware/restrictAccess");

router.post("/", restrictAccess, proxy);

module.exports = router;
