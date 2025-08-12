import express from "express";
import { detailsCodes } from "../controllers/code.controllers.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/code-details",authCheck,detailsCodes);

export default router;