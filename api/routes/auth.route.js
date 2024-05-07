import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

// now we tryna make a account so we use post method
router.post("/signup", signup);

export default router;