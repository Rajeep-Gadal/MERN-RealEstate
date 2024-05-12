import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
// to authorize that only a user that logged in an account can update their account not other users so to do that we use cookies

export default router;