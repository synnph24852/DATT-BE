import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user_id: { type: String, require: true },
        address: { type: String, require: true },
        books: [{ book_id: { type: String, required: true }, amount: { type: Number, default: 1 }, _id: false }],
        status: { type: String, enum: ["pending", "waiting", "delivering", "done", "cancel"], default: "pending" },
        total_price: { type: Number, require: true },
        reason: { type: String },
    },
    { collection: "order", timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
