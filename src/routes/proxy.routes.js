import express from "express";
import { proxyFile,downloadFile } from "../controllers/proxy.controllers.js";

const router = express.Router();

router.get('/fetch/files/:fileId/:fileName',proxyFile)
router.get('/download/files/:fileId/:fileName',downloadFile)

export default router;

