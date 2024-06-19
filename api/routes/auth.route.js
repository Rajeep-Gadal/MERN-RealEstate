import express from "express";
import { signin, signup, google, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

// now we tryna make a account so we use post method
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);
export default router;