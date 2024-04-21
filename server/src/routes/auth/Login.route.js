import { Router } from "express";
import LoginController from "../../controller/auth/login.controller.js"


const router=Router();

router.post('/auth',LoginController);

export default router;