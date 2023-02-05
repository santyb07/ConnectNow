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
        default:"",
    },
    lastname:{
        type:String,
        default:"",
    },
    mobile:{
        type:Number,
        default:"",
    },
    profile:{
        type:String,
        default:"https://res.cloudinary.com/dlxx86yjz/image/upload/v1675244631/1672911887920-blog-user_xmq1nj.png",
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