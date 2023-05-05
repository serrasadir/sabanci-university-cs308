
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    order: [],
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    status: { type: String, required: false, default: "Processing"}
});

export const OrderModel = mongoose.model("orders", OrderSchema);