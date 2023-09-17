import express from 'express'
const route = express.Router();

import userController from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';

import {valid_id, valid_user} from '../middlewares/global.middleware.js'

route.post("/", userController.create)
route.get("/", authMiddleware, userController.find_by_token);
route.get("/:id", valid_id, valid_user, userController.find_by_id)
route.patch("/:id",valid_id, valid_user, userController.update)

export default route