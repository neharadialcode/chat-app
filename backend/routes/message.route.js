import express from "express";
import { sendMessgae } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
const router = express();
router.post("/send/:id", protectRoute, sendMessgae);

export default router;
