import { CommentModel } from '../models/Comment.js';
import express from 'express';

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






export {router as CommentRouter};