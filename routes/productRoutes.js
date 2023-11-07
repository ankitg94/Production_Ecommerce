import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMidddleware.js'
import {createProductController,
     deleteProductController,
     getProductController,
     getsingleProductController,
     productPhotoController,
     UpdateProductController,
     productFiltersController,
     productCountController,
     productListController,
     searchProductController,
     realtedProductController,
     productCategoryController,
     braintreeTokenController,
     braintreePaymentController,
    } 
from  '../controllers/productController.js'

import formidable from 'express-formidable'

const router = express.Router()
//routes
//create product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController); 

// get product

router.get("/get-product",getProductController);

//single Product

router.get("/get-product/:slug", getsingleProductController);
//get.photo

router.get("/product-photo/:pid", productPhotoController)

//deleteProduct

router.delete("/delete-product/:pid",deleteProductController)

//update Product
router.put("/Update-product/:pid",
requireSignIn,
isAdmin,
formidable(),
UpdateProductController
);


//filter product
router.post('/product-filters', productFiltersController);

//router count
router.get('/product-count',productCountController);
//product per page
router.get('/product-list/:page',productListController);

//search products
router.get('/search/:keyword',searchProductController);

//similar product
router.get('/related-product/:pid/:cid',realtedProductController);


//category wise product

router.get('/product-category/:slug',productCategoryController);

//payment route
//token
router.get('/braintree/token',braintreeTokenController);

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)


export default router;
