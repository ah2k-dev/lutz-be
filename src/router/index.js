const router = require("express").Router();

router.use("/proxy", require("./proxy"));

module.exports = router;
