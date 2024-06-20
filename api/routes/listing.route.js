import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createListing, deleteListing, updateListing } from '../controllers/listing.controller.js';

// creating a router
const router = express.Router();

// creating a new listing
router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);

export default router;