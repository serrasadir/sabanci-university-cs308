import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    product_id: {type: String, required: true, unique: true},
    product_name: { type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    color: {type: String, required: true},
    imageUrl: {type: String, required: true},
    size: {type: String, required: true},
    stock: {type: Number, required:true},
    comments: [],
    ratings: 
    [    
          {
             type: Number
          } 
    ],
    rating: {type:Number, default: 0},
    warranty: {type: Number, required: false},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
});

export const ProductModel = mongoose.model("products", ProductSchema);