import mongoose from "mongoose";

const Cart = new mongoose.Schema(
    {
        user_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
        product_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
        amount: { type: Number, default: 1, require: true },
    },
    { collection: "Cart", timestamps: true }
);

const CartModel = mongoose.model("Cart", Cart);

export default CartModel;
