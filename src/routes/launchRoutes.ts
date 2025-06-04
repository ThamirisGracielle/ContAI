import express from "express";
import { getLaunches, createLaunch, getLaunchesByMonth } from "../controllers/launchController";

const router = express.Router();

router.get("/launches", getLaunches);
router.post("/launches", createLaunch);
router.get("/launches/:month/:year", getLaunchesByMonth);

export default router;
