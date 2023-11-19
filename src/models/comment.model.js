import mongoose from "mongoose";

const Comment = new mongoose.Schema(
    {
        comment: { type: String, required: true },
        user_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
        book_id: { type: mongoose.SchemaTypes.ObjectId, ref: "Book", require: true },
    },
    { collection: "Comment", timestamps: true }
);

const CommentModel = mongoose.model("Comment", Comment);

export default CommentModel;
