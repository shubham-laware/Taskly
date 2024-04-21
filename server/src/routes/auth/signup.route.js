import { Router } from "express";
import SignupController from "../../controller/auth/signup.controller.js"


const router=Router();

router.post('/new-user',SignupController);

export default router;