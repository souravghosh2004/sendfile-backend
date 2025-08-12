import { verifyToken } from "../services/token.services.js";
const authCheck = (req, res, next) => {
    try {
        const token =  req.cookies?.auth_token;

        if(!token) {
            res.clearCookie("auth_token");
            return res.status(401).json({success:false, message:"Unauthorized user.", data:null})
        }

        const decode = verifyToken(token);

        if(!decode){
            res.clearCookie("auth_token");
            return res.status(401).json({success:false, message:"Unauthorizeduser.", data:null});
        }
        req.user = decode;
        res.set('Cache-Control', 'no-store');
        next();
    } catch (er) {
        res.clearCookie("auth_token");
        return res.status(401).json({success:false, message:"Unauthorized user.", data:null});
    }
} 

export {authCheck}