import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createListing } from '../controllers/listing.controller.js';

// creating a router
const router = express.Router();

// creating a new listing
router.post("/create", verifyToken, createListing);

export default router;