import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:[true, "Name is needed"]
    },
    email: {
        type:String,
    },
    profilephoto: {
        type:String,
    },
    VIN: {
        type:String,
        required:[true, "VIN is needed"]
    },
    phoneNumber: {
        type:Number,
        required:[true, "Phone number is needed"]
    },
    password: {
        type:String,
        required:[true, "password is needed"]
    },
    isAdmin: {
        type:Boolean,
        default:false
    },
    role: {
        type:String,
        enum:["Admin", "Editor", "Guest"]
    },
},
{
    timestamps: true,
    toJSON: {virtuals: true}
});


const User = mongoose.model("User", userSchema)

export default User;