const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Task = require("../../models/Task");
const User = require("../../models/User");
const checkObjectId = require("../../middleware/checkObjectId");

// // @route   GET api/task
// // @desc    Test route
// // @access  Public
// router.get("/", (req, res) => res.send("Task route"));

// @route   POST api/task
// @desc    Create a task
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Task Description is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newTask = new Task({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const task = await newTask.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/task/:id
// @desc    Update a task
// @access  Private
router.put(
  "/:id",
  [
    auth,
    [check("text", "Task Description is required").notEmpty()],
    checkObjectId("id"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await Task.findById(req.params.id);

      if (
        task.user.toString() === req.user.id ||
        task.updatePrivilegesTo.map((user) => {
          if (user.toString() === req.user.id) return true;
        })
      ) {
        task.text = req.body.text;
      }

      await task.save();
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/task/updatePrivilegesTo/:id
// @desc    Add users who have privilege to update a task
// @access  Private
router.put(
  "/updatePrivilegesTo/:id/:userId",
  [auth, checkObjectId("id"), checkObjectId("userId")],
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);

      const privilegedUser = {
        user: req.params.userId,
      };

      if (task.user.toString() === req.user.id) {
        task.updatePrivilegesTo = [privilegedUser, ...task.updatePrivilegesTo];
      }

      await task.save();
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/task
// @desc    Get all tasks
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/task/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not Found" });
    }

    // Verify User
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await task.deleteOne();
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
