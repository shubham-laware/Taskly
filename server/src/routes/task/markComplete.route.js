import { Router } from "express";
import authenticate from "../../utils/verifyToken.js";
import MarkComplete from "../../controller/task/markComplete.controller.js";

const router=Router();

router.post('/complete',authenticate,MarkComplete);

export default router;