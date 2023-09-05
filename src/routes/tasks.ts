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
    console.error(error);
    res.json({ error: "Unable to create task" });
  }
});

// Route to get all tasks
router.get("/getAll", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.json({ error: "Unable to get tasks" });
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
router.put("/updateOne/:id", async (req, res) => {
  try {
    let messageArray = [];
    //
    const oneTask = await Task.findOne({ _id: req.params.id });
    //
    console.log(oneTask, "oneTask");

    //
    if (!oneTask) {
      return res.json({ message: "task not found in database" });
    }

    // console.log(req.body, "req.body");

    //

    //

    if (req.body.title) {
      const updateTitle = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: { title: req.body.title },
        },
        { returnOriginal: false }
      );
      //
      messageArray.push("title updated");
    }

    //
    if (req.body.description) {
      //
      const updateDescription = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: { description: req.body.description },
        },
        { returnOriginal: false }
      );
      //
      messageArray.push("description updated");
    }

    //
    if (messageArray.length < 1) {
      return res.json({ message: "no data passed to update" });
    }
    //
    res.json({ messageArray: messageArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to get tasks from database" });
  }
});
//

export default router;
