import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    // create an hashed password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
};


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        // if user choose a google account and then if that is not a valid account then this code will be shown
        if (!validUser) return next(errorHandler(404, "User not found"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        // if the user login in with the google account and the password which will enter by a user i not match with the database then this code will be shown
        if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

        // jwt means = jsonwebtoken
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// next is an middleware
export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // after selecting the google account if user is exit in the website then this code will run
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        } else {
            // but if the user is new and doesn't have an account then this code will run
            // it will create a new password of 16 length for the new user with hashedpassword and with the new username and profile image
            //adding two math type function will create a 16 length of password os it will be more secured
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            // this code will create an hashed password   
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            // this code will create a username, email, hashedpasword with profile image
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password:pass, ...rest } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signOut = (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("User has been logged out!");
    } catch(error) {
        next(error);
    }
};
