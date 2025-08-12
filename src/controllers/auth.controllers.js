import { verifyToken } from "../services/token.services.js";

const checkAuth = async (req, res) => {
    const token = req.cookies?.auth_token; // ✅ correct cookie access

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized user", data: null });
    }

    try {
        const decoded = verifyToken(token); // verifyToken should throw if invalid
        res.status(200).json({ success: true, message: "Valid user", data: decoded });
    } catch (err) {
        res.clearCookie("auth_token");
        return res.status(401).json({ success: false, message: "Unauthorized user", data: null });
    }
};

export { checkAuth };
