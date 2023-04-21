import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    product_id: {type: String, required: true, unique: true},
    product_name: { type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    color: {type: String, required: true},
    imageUrl: {type: String, required: true},
    x_small_size: 
    {
        type: Number,
        required: true
    },
    small_size: 
    {
        type: Number,
        required: true
    },
    medium_size: 
    {
        type: Number,
        required: true
    },
    large_size: 
    {
        type: Number,
        required: true
    },
    x_large_size: 
    {
        type: Number,
        required: true
    },
    xx_large_size: 
    {
        type: Number,
        required: true
    },
    comments: 
    [
       {
           user: 
           {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users", 
            required: false
           },
           comment:
           {
            type: String,
            required: false
           }
       }
    ],
    ratings: 
    [
        {
           user: 
           {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users", 
            required: false
           },
           rating:
           {
             type: Number,
             required: false
           } 
        }
    ],
    warranty: {type: Number, required: false},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
});

export const ProductModel = mongoose.model("products", ProductSchema);