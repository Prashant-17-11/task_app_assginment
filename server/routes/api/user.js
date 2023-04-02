const express = require("express");
const router = express.Router();

// @route   GET api/user
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("User route"));

// @route   POST api/user
// @desc    Register route
// @access  Public
router.get("/", (req, res) => res.send("User route"));

module.exports = router;
