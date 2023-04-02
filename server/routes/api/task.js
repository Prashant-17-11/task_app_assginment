const express = require("express");
const router = express.Router();

// @route   GET api/task
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Task route"));

module.exports = router;
