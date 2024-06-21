import express from "express";
import { test, deleteUser, updateUser, getUserListings, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
// to authorize that only a user that logged in an account can update their account not other users so to do that we use cookies
router.delete("/delete/:id", verifyToken, deleteUser);
// this will first verify you that are you a actually user of this account by verifying your token that if matches then redirect to the deleteUser section.
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);


export default router;