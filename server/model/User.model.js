import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        index:true,
        unique:true,
        sparse:true,
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        enum:["user","employee","admin"],
        default:"user"
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    mobile:{
        type:Number,
    },
    profile:{
        type:String,
    },
    termsandconditions:{
        type:Boolean,
        required:true,
        default:false,
    }
},{
    timestamps:true
})

export default mongoose.model.Users || mongoose.model('User',UserSchema);