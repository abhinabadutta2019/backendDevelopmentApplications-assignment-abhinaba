"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const mongoose = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON requests
app.use("/api/tasks", tasks_1.default);
dotenv_1.default.config();
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
