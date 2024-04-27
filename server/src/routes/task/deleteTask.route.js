import { Router } from "express";
import DeleteTaskController from "../../controller/task/deleteTask.controller.js"
import authenticate from "../../utils/verifyToken.js";


const router=Router();

router.post('/:id',authenticate, DeleteTaskController);

export default router;