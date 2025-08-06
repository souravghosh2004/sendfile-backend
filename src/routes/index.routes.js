import express from 'express';
import checkConnection from '../controllers/check.controllers.js';
const router = express.Router();

router.get("/check",checkConnection);

router.get('/hi', (req,res) => {
    res.send("Hey , I'm a server!");
})

import userRouter from "./user.routes.js";
router.use("/user",userRouter);


import proxyRouter from "./proxy.routes.js"
router.use("/file-manager",proxyRouter);

export default router;