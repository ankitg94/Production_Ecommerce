import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import {comparePassword,hashPassword} from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// -----------------------register-user---------------------------------
export const registerController = async(req,res) => {
  try{
     const{name,email,password,phone,address,answer,role} = req.body
     //validations
     
     if(!name){
        return res.send({message:'name is required'})
     }
     if(!email){
        return res.send({message:'email is required'})
     }
     if(!password){
        return res.send({message:'password is required'})
     }
     if(!phone){
        return res.send({message:'phone is required'})
     }
     if(!address){
        return res.send({message:'address is required'})
     }
     if(!answer){
      return res.send({message:'answer is required'})
     }
     if(!role){
      return res.send({message:'role is rquired'})
     }

     //check user 
     const existingUser = await userModel.findOne({email});
    //existing user
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:'already Register please login',            
        });
    }

   //register user saving thier details
   const hashedPassword = await hashPassword(password);
   //save
   const user = await new userModel({
      name,
      email,
      phone,
      address,
      password:hashedPassword,
      answer,
      role,
   
   }).save();

   res.status(201).send({
    success:true,
    message:'user Register succesfully',
    user,
   })
  }
 //--catch-- 
  catch (error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in registration',
        error        
    })
  }
};
//--------------------------------login from here---------------------------------------
//Post login
export const loginController = async (req,res) => {
  try{
   const {email,password} = req.body;
  //validation
  if(!email || !password){
  return res.status(404).send({
  success:false,
  message:"Invalid email or Password",
   });
  }
  //check user
  const user = await userModel.findOne({email});
  if(!user){
   return res.status(404).send({
     success:false,
     message:"Email is not register",
   });
  } 
//------match------------

  const match = await comparePassword(password,user.password)
  if(!match){
  return res.status(200).send({
    success:false,
    message:"invlid Password",
  });
  }
 // token
 const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,
   {expiresIn:'7d'});

   res.status(200).send({
   success:true,
   message:"login succesfully",
   user:{
    _id:user._id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:user.address,
    role:user.role,
   },
   token,
   });

} 

catch(error){
   console.log(error)
   res.status(500).send({
      success:false,
      message:'Error in login',
      error
   })
  }
};
///---------------------------------forget Password controller-----------
export  const forgetPasswordController = async(req,res)=>{
try{
   const {email,answer,newpassword} = req.body
   if(!email){
      res.status(400).send({message:'email is required'});
   }
   if(!answer){
      res.status(400).send({message:'answer is required'});
   }
   if(!newpassword){
      res.status(400).send({message:'new PAssword is required'});
   }
   //check
   const user = await userModel.findOne({email,answer});
   //validation
   if(!user){
     return res.status(404).send({
      success:false,
      message:"wrong Email or answer",
   });
   }
   const hashed = await hashPassword(newpassword);
   await userModel.findByIdAndUpdate(user._id,{password:hashed});
   res.status(200).send({
      success:true,
      message:"password change successfully",
   });
}catch(error){
   console.log(error)
   res.status(500).send({
      success:false,
      message:'something went wrong',
      error,
   });
  }
};
//-----------test controller-----------------------------------------------
export const testController =  (req,res)=>{
  try{
   res.send("protected Route");
  } catch(error){
  console.log(error);
  res.send({error});
}
};
//----------update profile---------------------------
export const updateProfileController = async(req,res)=>{
   try{
  const {name,email,password,address,phone} = req.body
  const user = await userModel.findById(req.user._id)
  //password
  if(password && password.length<6){
   return res.json({error:"Password is  required and 6 charc long"})
   }
   const hashedPassword = password ? await hashPassword(password):undefined
   const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
      name:name||user.name,
      password:hashedPassword ||user.password,
      phone:phone||user.phone,
      address:address||user.address
   },
   {new:true}
);
res.status(200).send({

   success:true,
   message:"profile updated succesfully",
   updatedUser,

});
   

}catch(error){
      console.log(error)
      res.status(400).send({
         success:false,
         message:"Error while update profile",
         error
      })
   }
};
//orders

export const getOrdersController = async(req,res)=>{
   try{
      const orders = await orderModel.find({buyer:req.user._id})
      .populate("products","-photo")
      .populate("buyer","name")
      res.json(orders);
    }
   catch(error){
      console.log(error)
      res.status(500).send({
     success:false,
     message:"Error while getting Orders",
     error,
      })
   }
}

























































