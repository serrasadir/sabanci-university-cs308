import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";


const router = express.Router()


router.post("/register", async (req, res) => {
     const { email, username, password } = req.body;
     const user = await UserModel.findOne({ username });
     const email1 = await UserModel.findOne({ email });
     if (email1) 
     {
        return res.json({message: "Email already exists!"});
     }
     if (user) 
     {
        return res.json({message: "Username already exists!"});
     }

     const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = new UserModel({email, username, password: hashedPassword});
     await newUser.save();

     res.json({message: "User registered successfully!"});
});



router.post("/login", async (req, res) => {
     
    const {username, password} = req.body;
    const user = await UserModel.findOne({ username });
    if (!user)  
    {
        return res.json({message: "User does not exist!"});
       
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) 
    {
       return res.json({message: "Username or Password is Incorrect!"})
    }
    
    const token = jwt.sign({id: user._id}, "secret");
    const user1 = username;
    res.json({token, user1, userID: user._id});
});


router.get("/order_history/:userid", async(req, res) => {
   try 
    {
      const response = await UserModel.findById({_id: req.params.userid});
      res.json(response);
      console.log(response);
    } 
    catch (err) 
    {
      res.json(err);
    }
})



export {router as userRouter};