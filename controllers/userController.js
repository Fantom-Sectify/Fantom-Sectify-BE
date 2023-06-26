import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
// import obtainTokenFromHeader from "../util/obtaintokenfromheader.js";



export const userRegisterController = async(req, res) => {
    const {fullname, profilephoto, country, email, password} =req.body;
    const foundUser = await User.findOne({email});
    try{
        if(foundUser){
            res.json({
                status: "error",
                data: "User already exists"
            });
        }else{
            //hashPasword
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullname,
            country, 
            email, 
            password: hashPassword,
            profilephoto
        })

        res.json({
            status: "success",
            data: user
        });
        }
    }catch(error){
        res.json(error.message)
    }
}

//login user
export const userLoginController = async(req, res) => {
    const {email, password} = req.body;
    // console.log(req.headers);
    
    try{
        const foundUser = await User.findOne({email});
        if(!foundUser){
            return res.json({
                status: "error",
                message: "Wrong login details"
            });
        }

        const userPassword = await bcrypt.compare(password, foundUser.password);
        if(!userPassword){
            return res.json({
                status: "error",
                message: "Wrong login details"
            });
        }else{
            res.json({
                status: "success",
                // data: "Your details has successfully logged in"
                data: {
                    fullname: foundUser.fullname,
                    email: foundUser.email,
                    token: generateToken(foundUser._id)
                }
            });
        }
    }catch(error){
        res.json(error.message)
    }
}

export const displayAllUsers = async(req, res) => {
    try {
        res.json({
            status:"success",
            data:"Display all the users"
        })
        
    } catch (error) {
        res.json(error.message)
        
    }
}

//profile
export const getSpecificUser = async(req, res) => {
    // const {id} = req.params;
    try{
        // const token = obtainTokenFromHeader(req);
        // console.log(token);
        // console.log(req.userAuth);
        const foundUser = await User.findById(req.userAuth);
        if(foundUser){
            return res.json({
                status: "success",
                data: {foundUser}
        });
        }else{
            res.json({
                status: "error",
                message: "User with such id does not exist"
        });
        }
    }catch(error){
        res.json(error.message)
    }
}

export const updateUser = async(req, res) => {
    try{
        res.json({
            status: "success",
            data: "user details updated"
        });
    }catch(error){
        res.json(error.message)
    }
}

export const profilePhotoUploadController = async(req, res) => {
    // console.log(req.file);
    try {

    const profileUserToBeUpdated = await User.findById(req.userAuth);
    if (!profileUserToBeUpdated) {
        res.json({
             status:"error",
             message:"User not found"
        })
    }

    //if the user is updating
    if(req.file){
        //update the profile
        await User.findByIdAndUpdate(req.userAuth,{
            $set:{
                profilephoto: req.file.path
            },
        },{
            new:true,
        }
        );
        res.json({
            status: 'success',
            data: 'image uploaded successfully'
        })
    }
        
    } catch (error) {
        res.json(error.message)
    }
}


export const deleteUser = async(req, res) => {
    try{
        res.json({
            status: "user deleted"
        });
    }catch(error){
        res.json(error.message)
    }
}
