import express  from "express";
import { getSpecificUser, displayAllUsers, userLoginController, userRegisterController } from "../controllers/userController.js";
import isLogin from "../middleware/isLogin.js";



const userRouters = express.Router();



// Register User
userRouters.post("/signup", userRegisterController)

// Login user
userRouters.post("/signin", userLoginController)

// get all users from
userRouters.get("", displayAllUsers)

// get user profile
userRouters.get("/profile/",isLogin, getSpecificUser)

// delete user
// userRouters.put("/:id", deleteUser)

// update user
// userRouters.put("/:id", updateUser)

// userRouters.post("/profile-image",isLogin, upload.single("profile"), profilePhotoUploadController )

export default userRouters;