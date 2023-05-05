import { OrderModel } from '../models/Order.js';
import express from 'express';
import { ProductModel } from '../models/Product.js'
import { UserModel } from '../models/Users.js';

const router = express.Router();


router.post("/save_order", async (req, res) => {
    const order = new OrderModel(req.body);
    let a = []
    a = req.body.order;
        try 
        {
             for (let i = 0; i < a.length; i++) {
               const product = await ProductModel.findById(a[i]._id)
               product.stock--;
               product.save();
             }
             const user = await UserModel.findById(req.body.userID)
             user.ordered.push(req.body);
             user.save();
             const response = await order.save();
             res.json(response);
        }
        catch (err) 
        {
             res.json(err);
        }   
});


router.get("/find", async(req, res) => {
     try 
     {
         const response = await OrderModel.find();
         res.json(response);
     }
     catch (err)
     {
         res.json(err);
     }

});

router.put("/in_transit/:order_id/:userid", async(req, res) => {
     const { order_id, userid } = req.params;
     try 
     {
         const response = await OrderModel.findById({_id: order_id});
         const user = await UserModel.findById({_id: userid});
         response.status = "In-Transit";
         for(let i = 0; user.ordered.length; i++)
         {
         if(user[i].ordered._id == order_id)
         {       
            user[i].ordered.status = "In-Transit"; 
            user[i].save();
         }
         }
         response.save();
         res.json(response);
     }
     catch (err)
     {
         res.json(err);
     }

});

router.put("/deliver/:order_id/:userid", async(req, res) => {
     const { order_id, userid } = req.params;
     try 
     {
         const response = await OrderModel.findById({_id: order_id});
         const user = await UserModel.findById({_id: userid});
         
         response.status = "Delivered";
         for(let i = 0; user.ordered.length; i++)
         {
         if(user[i].ordered._id == order_id)
         {       
            user[i].ordered.status = "Delivered"; 
            user[i].save();
         }
         }
         response.save();
         user.save();
         res.json(response);
     }
     catch (err)
     {
         res.json(err);
     }

});

export {router as OrderRouter};