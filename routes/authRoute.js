import  express   from 'express'
import {registerController,
    loginController,
    testController,
    forgetPasswordController,
    updateProfileController,
    getOrdersController,
    } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMidddleware.js';

//router object
const router = express.Router();
//routing
//REGISTER||METHOD POST
router.post('/register',registerController);
//login || method Post
router.post('/login',loginController);

//forget  Password
router.post("/forget-password",forgetPasswordController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController);
//protected user  route auth
router.get("/user-auth",requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
});
//protected admin route auth
router.get("/admin-auth", requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ok:true});
});

//update-profile
router.put('/profile',requireSignIn,updateProfileController);

//orders
router.get("/orders",requireSignIn,getOrdersController);

export default router;