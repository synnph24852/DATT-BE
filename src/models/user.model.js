import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        fullname: { type: String, require: true },
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        email: { type: String, unique: true, require: true },
        password: { type: String, min: 6, require: true },
        avatar: { type: String, default: "https://picsum.photos/300/300" },
        role: { type: String, enum: ["member", "admin"], default: "member" },
    },
    { collection: "user", timestamps: true }
);

const UserModel = mongoose.model("Users", User);

export default UserModel;
