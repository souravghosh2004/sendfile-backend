import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../config/env.confing.js"

const createToken = (payload) => {
    return jwt.sign(payload,JWT_SECRET,{expiresIn: "20d"})
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.warn("Invalid or expired token:", err.message);
    return null; // return null instead of throwing
  }
};
export {createToken,verifyToken}