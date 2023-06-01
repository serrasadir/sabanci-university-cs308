import express from 'express';
import mongoose from 'mongoose';
import { CategoryModel } from '../models/Category.js';
import { ProductModel } from "../models/Product.js";

const router = express.Router();

router.post("/save", async (req, res) => {
    const category = new CategoryModel(req.body);
        try 
        {
             console.log(category)
             const response = await category.save();
             res.json(response);
        }
        catch (err) 
        {
             res.json(err);
        }   
});

router.get("/find", async (req, res) => { 
    try 
    {
         const response = await CategoryModel.find({}); 
         res.json(response);        
    }
    catch (err) 
    {
         res.json(err);
    }
});

router.delete('/:category', async (req, res) => {
     try {
       console.log("iamhere");
       
       const deletedCategory = await CategoryModel.findOneAndDelete({ category: req.params.category });
       
       if (deletedCategory) {
         const deletedProducts = await ProductModel.deleteMany({ category: req.params.category });
         
         res.status(200).json({
           message: 'Category and associated products deleted successfully.',
           deletedCategory: deletedCategory,
           deletedProducts: deletedProducts
         });
       } else {
         res.status(404).json({
           message: 'Category not found.'
         });
       }
     } catch (error) {
       console.error('Error occurred while deleting category and products:', error);
       res.status(500).json({
         message: 'Internal server error.'
       });
     }
   });



export {router as CategoryRouter};