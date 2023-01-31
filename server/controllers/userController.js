import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import otpGenerator from "otp-generator"
import Mailgen from "mailgen"
import transporter from "../config/emailConfig.js"
dotenv.config()



/* POST: http://localhost:8080/api/v1/user/register */
export const register = async(req,res)=>{
    try{
        const {username, password,email,termsandconditions} = req.body;

        if( !username || !password || !email || !termsandconditions){
            return res.status(500).json({status:'failed',msg:'please fill all the details'})
        }
        
        const user= await UserModel.findOne({email:email});
        if(user){
            return res.status(500).json({status:'failed',msg:'Email already exists'});
        }
        if(password.length < 6){
            return res.status(400).json({status:'failed',msg: "Password must be at least 6 characters."})
        }
         
        const hashedPassword = await bcrypt.hash(password,10);
        const userDetails = {
            username,
            password:hashedPassword,
            email,
            termsandconditions,
        }

        const activation_token = jwt.sign(userDetails,process.env.JWT_SECRET,{expiresIn:'5m'})
        // console.log('activation token generated')
        const url= `${process.env.CLIENT_URL}/user/activate/${activation_token}`
        let info = await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:email,
            subject:"Verify the email address to activate the account",
            html:`<a href=${url}>click here to verify</a>`
        })
        return res.status(200).json({status:"success",msg:"Register Success! Please activate your email to start"})
    }catch(error){
        return res.status(500).json({status:"failed",msg:"Error while signup",error:error.message})
    }
}

/* POST: http://localhost:8080/api/v1/user/activate*/
export const activateEmail = async(req,res)=>{
    try{
        const { activation_token } = req.body;
        const user = jwt.verify(activation_token,process.env.JWT_SECRET);
        // console.log(user);
        const  {username, email, password, termsandconditions} = user;

        const check = await UserModel.findOne({email});
        if(check) return res.status(500).json({status:"failed",message:"This email already exists."})

        const newUser= new UserModel({
            username,
            email,
            password,
            termsandconditions,
        })
        await newUser.save();
        return res.status(200).json({status:"success",message:"Account has been activated"});

    }catch(error){
        return res.status(500).json({status:"failed",message:error.message});
    }
}

/* POST: http://localhost:8080/api/v1/login */
export const login = async (req,res)=>{

    const {email, password} = req.body;

    try{
        let user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({status:"failed",msg:'you are not a registered user.'})
        }

        let match = await bcrypt.compare(password,user.password);
        if(user.email === email && match){
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
            const userDetails = {email:user.email,usertype:user.usertype,username:user.username,firstname:user.firstname || "",lastname:user.lastname || "",profile:user.profile || "",mobile:user.mobile || ""}
            return res.status(200).json({token:token,status:'success',msg:'login success',user:userDetails})
        }else{
            return res.status(400).json({status:"failed",msg:"email or password does not match."})
        }
    }catch(error){
        return res.status(500).send({status:'failed',msg:"error while login",error:error.message})
    }
}            

/* POST: http://localhost:8080/api/v1/user/reset-password */
export const userPasswordResetMail= async(req,res)=>{
    const {email} = req.body;

    try{
        if(!email) res.status(500).json({status:failed,msg:"email field is required"});

        const user = await UserModel.findOne({email});
        if(!user) res.status(500).json({status:'failed',msg:'user not found.'})

        const secret = user._id+process.env.JWT_SECRET
        const token = jwt.sign({userId:user._id},secret,{expiresIn:'15min'})

        const link = `${process.env.CLIENT_URL}/api/v1/user/reset-password/${user._id}/${token}`
        console.log(link)
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject:"Password reset email.",
            html:`<a href=${link}>Click here to reset your password</a>`
        })
        return res.status(200).json({status:"success",msg:"Password reset mail is sent... please check your Email."})
    }catch(error){
        return res.status(500).json({status:"failed",msg:error.message})
    }
}

/* POST: http://localhost:8080/api/v1/user/reset-password/:id/:token */
export const userPasswordReset = async(req,res)=>{
    const {password} = req.body;
    const {id,token} = req.params;

    try{
        const user = await UserModel.findById(id);
        const new_secret = user._id + process.env.JWT_SECRET
        const info =jwt.verify(token,new_secret)
        
        if(password){
            const newHashedPassword = await bcrypt.hash(password,10);
            await UserModel.findByIdAndUpdate(user._id,{$set:{password:newHashedPassword}})
            return res.status(200).json({status:'success',message:'password changed'})
        }else{
            return res.status(500).json({status:'failed',message:'please enter the password'})
        }
    }catch(error){
        return res.status(500).json({status:'failed',message:'invalid token! please try again later.'})
    }
}

/* POST: http://localhost:8080/api/v1/user/updateaccount */
export const updateAccount = async(req,res)=>{
    const {firstname,lastname,mobile,profile} = req.body;
    const {_id} = req.user;
    
    try{
        if( firstname || lastname || mobile || profile){
            const user = await UserModel.findById(_id);
            if(!user) res.status(404).json({status:"failed",message:"user not found"})

            await UserModel.findByIdAndUpdate(user._id,{$set:{
                firstname,
                lastname,
                mobile,
                profile,
            }})
            return res.status(200).json({status:"success",msg:"account updated successfully."})

        }
    }catch(error){
        return res.status(500).json({status:"failed",msg:'enable to update the account',error:error.message})
    }

}

/* POST: http://localhost:8080/api/v1/user/change-password */
export const changeUserPassword = async(req,res)=>{
    const {password, confirmpassword} = req.body;
    const userId = req.user._id;

    try{
        if(password && confirmpassword){
            const hashedPassword = await bcrypt.hash(password,10);

            await UserModel.findByIdAndUpdate(userId,{$set:{password:hashedPassword}})
            res.status(200).json({status:'success',message:"password changed successfully."})
        }else{
            return res.status(500).json({msg:'all fields are required'})
        }
    }catch(error){
        return res.status(500).json({status:"failed",msg:error.message})
    }
}

export const loggedUser= async (request,response)=>{
    response.status(200).json({user:request.user});
}

/* POST: http://localhost:8080/api/v1/user/generateOTP  */
export const generateOTP =async (req,res)=>{    
    try{
        const {email} = req.body;
        
        if(!email) res.status(500).json({status:'failed',msg:"email field is required"});

        const user = await UserModel.findOne({email});
        if(!user) res.status(500).json({status:'failed',msg:'user not found.'})
        
        req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
        req.app.locals.EMAIL=user.email;

        // const secret = user._id+process.env.JWT_SECRET
        // const token = jwt.sign({userId:user._id},secret,{expiresIn:'15min'})
        // const link = `${process.env.CLIENT_URL}/api/v1/user/reset-password/${user._id}/${token}`

        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject:"Password reset email.",
            // html:`<a href=${link}>Click here to reset your password</a>`
            html:`Your OTP to reset Password is : ${req.app.locals.OTP}`
        })
        return res.status(200).json({status:"success",msg:"Password reset OTP is sent... please check your Email."})
    }catch(error){
        return res.status(500).json({status:"failed",msg:error.message})
    }
}

/* POST: http://localhost:8080/api/v1/user/verifyOTP  */
export const verifyOTP = async (req,res)=>{
    const { OTP:code } = req.body;
    // console.log(code);
    if(parseInt(req.app.locals.OTP)=== parseInt(code)){
        req.app.locals.OTP = null; //reset OTP value
        req.app.locals.resetSession = true; //start session for reset password
        return res.status(201).send({status:'success',msg:'OTP verified Successfully'})
    }
    return res.status(400).send({status:'failed',msg:'Invalid OTP',error:"Invalid OTP"})
}

// update the password when OTP IS VERIFIED
/* PUT: http://localhost:8080/api/v1/user/resetPassword  */
export const resetPassword = async(req,res)=>{
    try{

        const { password } = req.body;
        if(!req.app.locals.resetSession) return res.status(440).send({status:'failed',msg:'Session expired',error:"Session expired!"});
        req.app.locals.resetSession=false
        const email = req.app.locals.EMAIL;
        if(!password) return res.status(500).json({status:'failed',msg:"please provide your new password"})
        try{
            UserModel.findOne({email})
            .then(user=>{
                bcrypt.hash(password,10)
                .then(hashedPassword=>{
                    UserModel.updateOne({email:user.email},
                        {password:hashedPassword},(err,data)=>{
                            if(err) throw err;
                            return res.status(201).send({status:'success',msg:"Password Updated!"})
                        })
                })
                .catch(error=>{
                    return res.status(500).send({
                        status:'failed',
                        msg:'enable to hash password',
                        error:"Enable to hash password"
                    })
                })
            })
            .catch(error=>{
                return res.status(404).send({status:'failed',msg:'user not found',error:"User not Found"})
            })
        }catch(error){
            return res.status(500).send({status:'failed',msg:'not able to reset password',error:error.message})
        }
    }catch(error){

    }
}





















/* GET: http://localhost:8080/api/v1/user/example123 */
export const getUser = async (req,res)=>{
    
    const { username } = req.params;

    try{
        if(!username) return res.status(501).send({error:"Invalid Username"})

        UserModel.findOne({username},(err,user)=>{
            if(err ) return res.status(500).send({err});
            if(!user) return res.status(501).send({error:"Couldn'd Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({},user.toJSON());
            return res.status(201).send(rest);
        })
    }catch(error){
        return res.status(404).send({error:"Cannot Find User Data"})
    }


}

/* PUT: http://localhost:8080/api/v1/updateuser */
export const updateUser = async (req,res)=>{
    try{
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({_id:userId},body,(err,data)=>{
                if(err) throw err;

                return res.status(201).send({msg:"Record Updated"})
            })

        }else{
            return res.status(401).send({error:"user Not Found"})
        }
    }catch(error){
        return res.status(401).send({error})
    }
}



//successfully redirect user when OTP is valid
/* GET: http://localhost:8080/api/v1/createResetSession  */
export const createResetSession = async(req,res)=>{
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false; // allow access to this route only once
        return res.status(201).send({msg:"access granted"})
    }
    return res.status(440).send({error:"Session expire"})
}


export const registerMail = async (req,res)=>{

    const {username, userEmail, text, subject} = req.body;

    try{

        var email = {
            body:{
                name:username,
                intro: text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
                outro: 'Need help, or have question? Just reply to this email, we\'d love to help.'
            }
        }
    
        let MailGenerator = new Mailgen({
            theme:"default",
            product:{
                name:"Mailgen",
                link:'https://mailgen.js/'
            }
        })
        var emailBody = MailGenerator.generate(email);
        
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to:userEmail,
            subject:subject || "Signup Successful",
            html:emailBody
        })
        .then(()=>res.status(200).send({msg:"You should receive an email from us."}))
        .catch(error=> res.status(500).send({error}))
    }catch(error){
        res.status(500).json({status:"failed",msg:"error while registerMail"})
    }

}