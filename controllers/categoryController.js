import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req,res) =>{
try{
    const   {name} = req.body
    if(!name){
        return res.status(401).send({message:'name is required'})
    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'catogry already exist'
        })
    }
   const category = await new categoryModel({name,slug:slugify(name)}).save()
   res.status(201).send({
   success:true,
   message:'New Catogry  Created',
   category
   })

} catch (error){
    console.log(error)
    res.status(500).send({
     success:false,
     message:'Error in catogry',
     error
    });
   }
};
//updated category
export const updateCategoryController = async(req,res) =>{
 try{
    const {name} =req.body
    const {id} =req.params
    const category = await categoryModel.findByIdAndUpdate(id,
    {name,slug:slugify(name)},{new:true})
    res.status(200).send({
        success:true,
        message:"category updated Succesfully",
        category
    })
 }
 catch(error){
      console.log(error)
      res.status(500).send({
        success:false,
        error,
        message:"Error while updating Category"
      })
 }
};
// get all cat
export const categoryController = async(req,res)=>{
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All categories list",
            category,
        });

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all catogries"
        })
    }
};
//single category
export const singleCategoryController = async(req,res)=>{
    try{
        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
        success:true,
        message:"Get single category succesfully",
        category
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single catogry"
        })
    }
};
//delete category
export  const deleteCategoryController = async (req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted success",
        });
    }  catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while deleting",
            error
        })
    }
};