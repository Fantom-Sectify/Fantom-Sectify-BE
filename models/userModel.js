import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:[true, "Name is needed"]
    },
    profilephoto: {
        type:String,
    },
    email: {
        type:String,
        required:[true, "Email is needed"]
    },
    password: {
        type:String,
        required:[true, "password is needed"]
    },
    country: {
        type:String,
        required:[true, "country is needed"],
        default:"Nigeria"
    },
    isBlocked: {
        type:Boolean,
        default:false
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