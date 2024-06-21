import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.send("Test route");
};

export const updateUser = async (req, res, next) => {
    // this will control the user by giving that update functionallity after the verification from the user.router.js
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "You can only update your own account!"));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );

        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {      // this will control the user by giving that update functionallity after the verification from the user.router.js

    if (req.user.id !== req.params.id)       // check if the user account is matches if not then this will retrun
        return next(errorHandler(401, "You can only delete your own account!"));  // this error handler is the utils function used to create a custom error from the utils folder 
    // if the user matches then the below code will run
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");     // after deleting the account your cookies will be remain so to delete that we use this to clear the cookies
        res.status(200).json("User has been deleted...");
    } catch (error) {
        next(error);     // it used middleware to handle the error or issues happens
    }
};


export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "You can only view your own listings!"));
    }
};


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, "User not found!"));   // if user is not found
        const { password: pass, ...rest } = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
