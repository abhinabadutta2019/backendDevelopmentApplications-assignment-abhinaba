import express from "express";
import tasksRouter from "./routes/tasks";
const mongoose = require("mongoose");
import dotenv from "dotenv";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

//
app.use("/tasks", tasksRouter);

//
dotenv.config();

console.log("Hi3");

//
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/typeScript-toDoApp?retryWrites=true&w=majority`;
//
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
