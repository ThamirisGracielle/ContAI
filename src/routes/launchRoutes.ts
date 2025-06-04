import express from "express";
import { getLaunches, createLaunch } from "./controllers/launchController";

const router = express.Router();

router.get("/launches", getLaunches);
router.post("/launches", createLaunch);

export default router;

