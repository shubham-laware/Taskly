import { Router } from "express";
import AddTaskController from "../../controller/task/addTask.controller.js"
import authenticate from "../../utils/verifyToken.js";


const router=Router();

router.post('/new-task',authenticate, AddTaskController);

export default router;