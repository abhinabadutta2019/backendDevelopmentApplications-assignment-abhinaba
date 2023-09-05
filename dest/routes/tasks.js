"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Task = require("../models/Task");
const router = express_1.default.Router();
// Route to create a new task
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = yield Task.create(req.body);
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Unable to create task" });
    }
}));
// Route to get all tasks
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task.find();
        res.json(tasks);
    }
    catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ error: "Unable to retrieve tasks" });
    }
}));
exports.default = router;
