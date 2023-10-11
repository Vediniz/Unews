import express from 'express'
const route = express.Router();

import userController from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';

import {valid_id, valid_user, find_recovery_question} from '../middlewares/global.middleware.js'

route.post("/", userController.create)
route.get("/", authMiddleware, userController.find_by_token);
route.get("/:id", valid_id, valid_user, userController.find_by_id)
route.patch("/:id",valid_id, valid_user, userController.update)
// Talvez eu passe o validate-answer para o auth 
route.post("/validate-answer", userController.validate_answer);

export default route