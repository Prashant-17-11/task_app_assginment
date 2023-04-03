const mongoose = require("mongoose");

// middleware to check for valid object Id
const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: "Invalid ID" });
  next();
};

module.exports = checkObjectId;
