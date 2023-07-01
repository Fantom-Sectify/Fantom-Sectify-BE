import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import {generateRandomAlphaNumeric }from "../utils/generateRandomVIN.js";
import {sendEmail} from "../utils/sendEmail.js";
// import obtainTokenFromHeader from "../util/obtaintokenfromheader.js";



export const userRegisterController = async(req, res) => {
    const {fullname, profilephoto, email, phoneNumber, password} =req.body;
    const foundUser = await User.findOne({phoneNumber});
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

        const VIN = await generateRandomAlphaNumeric(10);

        const user = await User.create({
            fullname,
            VIN,
            phoneNumber,
            email, 
            password: hashPassword,
            profilephoto
        })

        res.json({
            status: "success",
            data: user
        });

        
        setTimeout(() => {
            sendEmail(user.email, user.VIN);
        }, 1500); // 15sec in milliseconds
        }

    }catch(error){
        res.json(error.message)
    }
}

//login user
export const userLoginController = async(req, res) => {
    const {VIN, phoneNumber, password} = req.body;
    // console.log(req.headers);
    
    try{
        const foundUser = await User.findOne({VIN});
        if(!foundUser){
            return res.json({
                status: "error",
                message: "Wrong login details"
            });
        }

        const foundUserNumber = await User.findOne({phoneNumber});
        if(!foundUserNumber){
            return res.json({
                status: "error",
                message: "Wrong login detailsw"
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
                    VIN: foundUser.VIN,
                    fullname: foundUser.fullname,
                    phoneNumber: foundUser.phoneNumber,
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

