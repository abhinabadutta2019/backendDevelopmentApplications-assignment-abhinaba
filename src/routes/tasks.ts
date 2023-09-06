import express, { Request, Response } from "express";
// import { ITask } from "../interfaces/Task";
const Task = require("../models/Task");
const router = express.Router();

//////////ZOD setup starts////////////////////////////////////////
import { z } from "zod";
const { ZodError } = require("zod");
/////////////

//
// in zod everything is -- required by default-- if something is optional, you have to -- mention, that is optional

const TaskSchema = z.object({
  title: z.string().min(5).default("null"),
  description: z.string().default("null"),
  completed: z.boolean().default(false),
});
////////////////////
type OneTask = z.infer<typeof TaskSchema>;
//
const oneTask = { title: "a", description: "play " };
//testing with zod schema
// console.log(TaskSchema.parse(oneTask), "response from zod");
//
try {
  console.log(TaskSchema.parse(oneTask), "response from zod");
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log(err.issues[0].message);
  }
}
//////////ZOD setup ends////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
////////----------ROUTES--------------------------///////////////////////
///////////////////////////////////////////////
// Route to create a new task
router.post("/create", async (req: Request, res: Response) => {
  try {
    //
    //
    const title = req.body.title;
    const description = req.body.description;
    //
    // type OneTask = z.infer<typeof TaskSchema>;
    // Validate the request body using Zod schema

    const validatedData = TaskSchema.parse({
      title: title,
      description: description,
    });

    //

    const newTask = await Task.create(validatedData);
    //
    console.log(newTask, "newTask");

    res.status(201).json(newTask);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues[0].message, "error message from catch block");
      return res.json({ message: err.issues[0].message });
    }
    console.log(err);
    res.json({ error: "Unable to create tasks" });
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
router.put("/updateOne/:id", async (req: Request, res: Response) => {
  try {
    //
    // const task = req.body as ITask;
    // const task: ITask = req.body;
    /////////////////////////////////////
    let messageArray = [];
    //
    const title = req.body.title;
    const description = req.body.description;
    //
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
    const validatedData = TaskSchema.parse({
      title: title,
      description: description,
    });

    //
    // console.log(validatedData, "validatedData");

    if (title && title != null) {
      //
      // if (typeof title !== "string") {
      //   return res.status(400).json({ error: "Invalid title " });
      // }
      //
      console.log(validatedData, "validatedData from title block");
      //
      const updateTitle = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: { title: title },
        },
        { returnOriginal: false }
      );
      //
      messageArray.push("title updated");
    }

    //
    if (description && description != null) {
      //
      // if (typeof description !== "string") {
      //   return res.status(400).json({ error: "Invalid description " });
      // }
      //
      console.log(validatedData, "validatedData from description block");
      //
      const updateDescription = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: { description: description },
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
    const updatedTask = await Task.findOne({ _id: req.params.id });
    //
    res.json({ messageArray: messageArray, updatedTask: updatedTask });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues[0], "error message from catch block");
      return res.json({ message: err.issues[0].message });
    }
    console.log(err);
    res.json({ error: "Unable to create tasks" });
  }
});
//

export default router;
