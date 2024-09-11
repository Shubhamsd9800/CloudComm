import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"

dotenv.config();
// Cloudinary Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

/* REGISTER USER */
/* REGISTER USER */
export const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    let picturePath = null;
    // Check if a file was uploaded
    if (req.file) {
      try {
        const localFilePath = req.file.path;
        const result = await cloudinary.uploader.upload(localFilePath, {
          folder: "users",
          public_id: `user_${firstName}_${lastName}_${Date.now()}`,
        });
        console.log("Image uploaded to Cloudinary:", result);
        picturePath = result.secure_url;
        fs.unlinkSync(localFilePath);
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }
    
    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath, // Save the Cloudinary URL in the database
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};