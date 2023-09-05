import express from "express";
const Task = require("../models/Task");

const router = express.Router();

// Route to create a new task
router.post("/create", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    //
    console.log(newTask, "newTask");

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Unable to create task" });
  }
});

// Route to get all tasks
router.get("/getAll", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ error: "Unable to get tasks from database" });
  }
});
//
router.delete("/deleteOne/:id", async (req, res) => {
  try {
    const oneTask = await Task.findOne({ _id: req.params.id });
    //
    if (!oneTask) {
      return res.json({ message: "task not found in database" });
    }
    //

    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });

    //
    res.json({ deleteTask: deleteTask, message: "task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to get tasks from database" });
  }
});
//

export default router;
