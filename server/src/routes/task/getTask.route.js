import { Router } from "express";
import authenticate from "../../utils/verifyToken.js";
import GetTaskController from "../../controller/task/getTask.controller.js"

const router=Router();

router.get('/tasks',authenticate,GetTaskController);

export default router;