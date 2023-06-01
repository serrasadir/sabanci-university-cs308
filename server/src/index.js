import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from './routes/users.js';
import { productRouter } from './routes/product.js';
import { CommentRouter } from "./routes/comment.js";
import { OrderRouter } from "./routes/order.js";
import { CategoryRouter } from "./routes/category.js";


const app = express()

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/product", productRouter);
app.use("/comment", CommentRouter);
app.use("/order", OrderRouter);
app.use("/category", CategoryRouter);


mongoose.connect("mongodb+srv://admin:admin@cluster0.09jsywh.mongodb.net/?retryWrites=true&w=majority");


app.listen(3001, () => console.log("SERVER STARTED!"));
