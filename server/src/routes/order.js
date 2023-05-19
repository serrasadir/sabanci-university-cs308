import { OrderModel } from '../models/Order.js';
import express from 'express';
import { ProductModel } from '../models/Product.js'
import { UserModel } from '../models/Users.js';
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_KEY);




router.post("/save_order", async (req, res) => {
    const order = new OrderModel(req.body);
    let a = []
    a = req.body.order;
    order.total = req.body.total;
    await order.save();
    console.log("ORDER SAVED");
        try 
        {
            
             for (let i = 0; i < a.length ;i++) {
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


router.put("/refund/:order_id/:userid", async(req, res) => {
    const { order_id, userid } = req.params;

    try 
    {
        const response = await OrderModel.findById({_id: order_id});
        if (!response) {
            return res.status(404).json({ error: "Order not found" });
          }
        let a = []
        a = req.body.response;
        const user = await UserModel.findById({_id: userid});
        const refundablePeriod = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        const currentTime = new Date().getTime();
        const orderCreationTime = order.createdAt.getTime();
        const elapsedTime = currentTime - orderCreationTime;
        if (elapsedTime > refundablePeriod) {
            return res.status(400).json({ error: "Refund period has expired" });
        }
          else {
            for (let i = 0; i < a.length; i++) {
                const response = await ProductModel.findById(a[i]._id)
                response.stock++;
                //response.status = "Refunded";
                response.save();
              }
                for(let i = 0; i < user.ordered.length; i++)
                {
                if(user[i].ordered._id == order_id)
                { 
                user[i].ordered.status = "Refunded"; 
                user[i].save();
                }
                }

                response.save();}
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
        await response.save();
        console.log("hi")
        console.log("BURASIIIIIIIIIIIIIIIII",response._id)
        for (let i = 0; i < user.ordered.length; i++) {
            console.log(i)
           if ((user.ordered[i]._id).equals(response._id)) {
             console.log("Old status:", user.ordered[i].status);
             console.log("Order ID:", user.ordered[i]._id);
             console.log("Total value:", user.ordered[i].total);
             console.log("Order ID from params:", order_id);
             user.ordered[i].status = "In-Transit";
             user.save();
             console.log("New status:", user.ordered[i].status);
             console.log("Status changed");
           }
       }
 
       await user.save();
       console.log("User saved successfully");
 
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
       console.log(order_id);
       console.log(userid);
       const response = await OrderModel.findById({_id: order_id});      
       console.log(response)
       const user = await UserModel.findById({_id: userid});
       response.status = "Delivered";
       await response.save();
       console.log("hi")
       console.log(response.userID)
       console.log(order_id)
       console.log(response._id)
       for (let i = 0; i < user.ordered.length; i++) {
          if ((user.ordered[i]._id).equals(response._id)) {
            console.log("Old status:", user.ordered[i].status);
            console.log("Order ID:", user.ordered[i]._id);
            console.log("Total value:", user.ordered[i].total);
            console.log("Order ID from params:", order_id);
            user.ordered[i].status = "Delivered";
            await user.save();
            console.log("New status:", user.ordered[i].status);
            console.log("Status changed");
          }
      }
 
      await user.save();
      console.log("User saved successfully");
 
      res.json(response);
   }
   catch (err)
   {
       res.json(err);
   }
 
 });

export {router as OrderRouter};