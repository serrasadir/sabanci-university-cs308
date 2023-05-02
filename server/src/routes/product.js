import express from 'express';
import mongoose from 'mongoose';
import { ProductModel } from "../models/Product.js";
import { UserModel } from '../models/Users.js';
import { CommentModel } from '../models/Comment.js';

const router = express.Router();



router.get("/find", async (req, res) => { 
    try 
    {
         const response = await ProductModel.find({}); 
         res.json(response);        
    }
    catch (err) 
    {
         res.json(err);
    }
});

router.get("/:product_id", async (req, res) => { 
    const {product_id} = req.params;
    try 
    {
        console.log(product_id);
         const response = await ProductModel.findOne({product_id: product_id })
         if(!response){
          res.sendStatus(404);
                 }
         res.json(response);        
    }
    catch (err) 
    {
         res.json(err);
    }
});

router.post("/save", async (req, res) => {
    const product = new ProductModel(req.body);
        try 
        {
             const response = await product.save();
             res.json(response);
        }
        catch (err) 
        {
             res.json(err);
        }   
});


router.put("/", async (req, res) => {
     const product = await ProductModel.findById(req.body.prodid);
     const user = await UserModel.findById(req.body.userID);
    try 
    {
      user.savedProducts.push(product); 
      await user.save();
      res.json({ savedProducts: user.savedProducts });
    } 
    catch (err) 
    {
      res.json(err);
    }
  });

router.get("/savedProducts/ids/:userID", async (req, res) => {
    try 
    {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedProducts: user?.savedProducts });
    }
    catch (err)
    {
      res.json(err);
    }
});

router.get("/savedProducts/:userID", async (req, res) => {
    try 
    {
        const user = await UserModel.findById(req.params.userID);
        const savedProducts = await ProductModel.find({
            _id: { $in: user.savedProducts },
        });

        res.json({ savedProducts });
    }
    catch (err)
    {
      res.json(err);
    }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    console.log("searched");
    console.log(query);
    const products = await ProductModel.find({
      $or: [
        { product_name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export {router as productRouter};