import express from "express";
const router = express.Router();
import upolad from '../middlewares/multer.middlewares.js'

import {createNewUser, loginUser} from "../controllers/users.controllers.js";
import uploadFiles from "../controllers/file.controllers.js";
import upload from "../middlewares/multer.middlewares.js";
import { getFiles } from "../controllers/file.controllers.js";
router.post("/create/new-user",createNewUser);
router.post("/upload-files",upload.array('files'),uploadFiles)
router.get("/fetch-files/:uniqueCode",getFiles);
router.post("/login",loginUser);





export default router;