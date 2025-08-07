import express from "express";
import { fetchText, storeText } from "../controllers/text.controllers.js";

const router = express.Router();

router.post("/store",storeText)
router.get("/fetch/:uniqueCode",fetchText);


export default router;