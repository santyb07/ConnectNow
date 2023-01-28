import { Router } from "express";
import * as controller from "../controllers/userController.js"
import userAuth,{localVariables} from "../middleware/auth.js"

const router = Router();


//Public Routes
router.route('/register').post(controller.register); // register user
router.route('/activate').post(controller.activateEmail); // activate the email account and save in database
router.route('/login').post(controller.login); // login in app

//in case of forget password
router.route('/reset-password').post(controller.userPasswordResetMail)
router.route('/reset-password/:id/:token').post(controller.userPasswordReset)

// protected route (authorization needed)
router.route('/updateaccount').post(userAuth,controller.updateAccount);
router.route('/change-password').post(userAuth,controller.changeUserPassword)
router.route('/loggeduser').get(userAuth,controller.loggedUser)

// /** POST Methods */
// router.route('/registerMail').post(controller.registerMail); // send the email
// router.route('/authenticate').post((req,res)=>res.end()); // authenticate user

// /** GET Methods */
// router.route('/user/:username').get(controller.getUser) // user with username
// router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP) // generate random OTP
// router.route('/verifyOTP').get(controller.verifyOTP) // verify generated OTP
// router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


// /** PUT Methods */
// router.route('/updateuser').put(userAuth,controller.updateUser); // is use to update the user profile
// router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword); // use to reset password

export default router;