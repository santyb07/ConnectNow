import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // TRUE FOR 465, FALSE FOR OTHER PORTS
    auth:{
        user:process.env.EMAIL_USER, // ADMIN GMAIL ID
        pass: process.env.EMAIL_PASS //ADMIN GMAIL PASSWORD
    }
})

export default transporter;