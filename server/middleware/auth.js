
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import UserModel from "../model/User.model.js";

dotenv.config()

const userAuth = async(req,res,next)=>{
    try{

        //access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];
        
        if(token === null) res.status(500).json({msg:'Unauthorized user, No token'});

        //retrive the user details to the logged in user
        const {userId} = await jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = await UserModel.findById(userId).select('-password');

        // res.json(decodedToken);
        next();

    }catch(error){
        res.status(401).json({error: "Authentication Failed!"})
    }
}

export default userAuth;


export const localVariables= (req,res,next)=>{
    req.app.locals = {
        OTP : null,
        resetSession: false,
        EMAIL:null
    }
    next()
}