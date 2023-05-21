import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password:  {type: String, required: true },
    savedProducts: [{type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    ratedProducts: [{type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    ordered: 
    [
        {
        order: [],
        userID: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
        status: {type: String},
        total: {type: Number},
        date1: {type: Date}
        }
    ],
    address: {type: String, required: false, default: ""},
    city: {type: String, required: false, default: ""},
    cardNumber: {type: String, required: false, default: ""},


});


export const UserModel = mongoose.model("users", userSchema);



