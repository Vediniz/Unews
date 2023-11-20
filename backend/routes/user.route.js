import express from 'express'
const route = express.Router()

import userController from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

import {valid_id, valid_user} from '../middlewares/global.middleware.js'

route.post("/recover-question", userController.find_recovery_question)
route.post("/validate-answer", userController.validate_answer)
// route.post("/", userController.create)


route.get("/:id", valid_id, valid_user, userController.find_by_id) 
route.patch("/:id", valid_id, valid_user, userController.update) 

route.use(authMiddleware)
route.get("/", userController.find_by_token) 


export default route