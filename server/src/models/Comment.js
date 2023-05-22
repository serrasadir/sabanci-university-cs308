import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    prod_id: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true},
    user_name: {type: String, ref: "users", required: true}
},{ timestamps: true });

export const CommentModel = mongoose.model("comments", CommentSchema);