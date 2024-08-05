import express from "express";
import { newsController } from "../controllers/newsCallController.js";
const router = express.Router();

router.post("/news",newsController);

export { router as newsCallRoutes };