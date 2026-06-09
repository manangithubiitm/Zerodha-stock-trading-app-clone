const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        console.log("Auth Middleware Hit");
        const token = req.cookies.token;

        console.log("Headers:", req.headers);
        console.log("Cookies:", req.cookies);
        console.log("Token:", req.cookies.token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        );
        console.log("Decoded JWT:", decoded);
        req.user = decoded;

        next();
    } catch(err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};

module.exports = authMiddleware;