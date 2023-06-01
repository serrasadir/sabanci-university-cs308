import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    category: {type: String, required: true},
});

export const CategoryModel = mongoose.model("category", CategorySchema);