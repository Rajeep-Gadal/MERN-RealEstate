// we have access token from where we can verify and can update the user profile
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;   // getting the access token
    if (!token) return next(errorHandler(401, "Unauthorized"));   // if the token is not same then it will say unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Forbidden"));

        req.user = user;
        next();
    });
}