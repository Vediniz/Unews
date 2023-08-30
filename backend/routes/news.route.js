import express from 'express'
const router = express.Router();

import {create, find_all, latest_news, find_by_id, search_news_title, update, erase} from '../controllers/news.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js'

router.post("/", authMiddleware, create)
router.get("/", find_all)
router.get("/top", latest_news)
router.get("/search", search_news_title)

router.get("/:id", authMiddleware, find_by_id)
router.patch("/:id", authMiddleware, update )
router.delete("/:id", authMiddleware, erase)


export default router