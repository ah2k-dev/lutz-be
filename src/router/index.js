const router = require("express").Router();

router.use("/proxy", require("./proxy"));
router.use("/contact", require("./contact"));

module.exports = router;
