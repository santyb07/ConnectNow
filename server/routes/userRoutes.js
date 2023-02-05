import { Router } from "express";
import userAuth,{localVariables} from "../middleware/auth.js"
import * as userController from "../controllers/userController.js"
import * as conversationController from "../controllers/conversationController.js"
import * as messageController from "../controllers/messageContoller.js"

const router = Router();


//Public Routes
router.route('/register').post(userController.register); // register user
router.route('/activate').post(userController.activateEmail); // activate the email account and save in database
router.route('/login').post(userController.login); // login in app

//in case of forget password
router.route('/reset-password').put(userController.userPasswordResetMail)
router.route('/reset-password/:id/:token').put(userController.userPasswordReset)

// protected route (authorization needed)
router.route('/updateaccount').put(userAuth,userController.updateAccount);
router.route('/change-password').put(userAuth,userController.changeUserPassword)
router.route('/loggeduser').get(userAuth,userController.loggedUser)
router.route('/users').get(userAuth,userController.getAllUsers);

//in case of fotget password with OTP validation
router.route('/generateOTP').post(localVariables,userController.generateOTP)
router.route('/verifyOTP').post(userController.verifyOTP)
router.route('/resetPassword').put(userController.resetPassword)

//conversations
router.post('/conversation/add',conversationController.newConversation);
router.post('/conversation/get', conversationController.getConversation);
router.post('/message/add',messageController.newMessage)
router.get('/message/get/:id',messageController.getMessage)


export default router;