import { CommentModel } from '../models/Comment.js';
import express from 'express';
import { ProductModel } from '../models/Product.js';
import mongoose from 'mongoose';


const router = express.Router();



router.post("/save_comment", async (req, res) => {
    const comment = new CommentModel(req.body);
        try 
        {
             const response = await comment.save();
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
         const response = await CommentModel.find({}); 
         res.json(response);        
    }
    catch (err) 
    {
         res.json(err);
    }
});


router.post("/post_comment", async (req, res) => {
     const comment = new CommentModel(req.body);
         try 
         {
              const prod = await ProductModel.findById(comment.prod_id);
              prod.comments.push(comment);
              prod.save();
              console.log("saved")
              res.json(prod);
         }
         catch (err) 
         {
              res.json(err);
         }   
 });

 router.delete('/:id', (req, res) => {
     CommentModel.findOneAndDelete({ _id: req.params.id })
       .then((deletedUser) => {
         if (deletedUser) {
           res.status(200).json({
             message: 'User deleted successfully.',
             deletedUser: deletedUser
           });
         } else {
           res.status(404).json({
             message: 'User not found.'
           });
         }
       })
       .catch((error) => {
         console.error('Error occurred while deleting user:', error);
         res.status(500).json({
           message: 'Internal server error.'
         });
       });
   });

export {router as CommentRouter};