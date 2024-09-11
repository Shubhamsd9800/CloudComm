import Post from "../models/Post.js";
import User from "../models/User.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"

dotenv.config();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/* CREATE */
export const createPost = async (req, res, next) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    
    let picturePath = null;

    // Check if a file was uploaded
    if (req.file) {
      // Local file path
      const localFilePath = req.file.path;

      // Upload the picture to Cloudinary in a specific folder
      const result = await cloudinary.uploader.upload(localFilePath, {
        folder: "posts", // Specify the Cloudinary folder name
        public_id: `post_${user.firstName}_${user.lastName}_${Date.now()}`, // Unique identifier for the image
      });

      // Set the Cloudinary URL as the picture path
      picturePath = result.secure_url;

      // Delete the local file after uploading to Cloudinary
      fs.unlinkSync(localFilePath);
    }

    // Create a new post
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath, // Store the Cloudinary URL
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res,next) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res,next) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res,next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};