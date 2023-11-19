import mongoose from "mongoose";

const StarSchema = new mongoose.Schema(
    {
        star: { type: Number, required: true },
        user_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
        book_id: { type: mongoose.SchemaTypes.ObjectId, ref: "Book", require: true },
    },
    { collection: "star", timestamps: true }
);

const StarModel = mongoose.model("Star", StarSchema);

export default StarModel;
