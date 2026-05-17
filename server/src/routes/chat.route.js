import { Router } from "express";
import { chatWithGemini } from "../controllers/chat.controller.js";

const router = Router();

router.route("/").post(chatWithGemini);

export default router;
