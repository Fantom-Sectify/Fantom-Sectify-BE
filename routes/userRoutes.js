import express  from "express";
import { deleteUser, getSpecificUser, displayAllUsers, userLoginController, userRegisterController, updateUser } from "../controllers/userController.js";
import isLogin from "../middleware/isLogin.js";



const userRouters = express.Router();



// Register User
userRouters.post("/register", userRegisterController)

// Login user
userRouters.post("/loginin", userLoginController)

// get all users from
userRouters.get("", displayAllUsers)

// get user profile
userRouters.get("/profile/",isLogin, getSpecificUser)

// delete user
userRouters.put("/:id", deleteUser)

// update user
userRouters.put("/:id", updateUser)

// userRouters.post("/profile-image",isLogin, upload.single("profile"), profilePhotoUploadController )

export default userRouters;