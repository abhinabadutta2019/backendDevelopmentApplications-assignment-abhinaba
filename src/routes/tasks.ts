import express from "express";
const Task = require("../models/Task");

const router = express.Router();

// Route to create a new task
router.post("/", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Unable to create task" });
  }
});

// Route to get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ error: "Unable to retrieve tasks" });
  }
});

export default router;
