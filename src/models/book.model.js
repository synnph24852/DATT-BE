import mongoose from "mongoose";
import slugify from "slugify";

const BookSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        slug: { type: String, unique: true },
        author: { type: String, require: true },
        price: { type: Number },
        original_price: { type: Number },
        description: { type: String },
        quantity_sold: { type: Number, default: 0 },
        quantity: { type: Number, required: true },
        avatar: { type: String, default: "https://picsum.photos/300/300" },
        images: [{ type: String }],
        category_id: { type: mongoose.SchemaTypes.ObjectId, ref: "Category", require: true },
    },
    { collection: "book", timestamps: true }
);

BookSchema.index({ name: "text", author: "text" });

BookSchema.pre("save", async function (next) {
    try {
        let slug = slugify(this.name, {
            replacement: "-",
            lower: true,
            strict: false,
            locale: "vi",
            trim: true,
        });

        const existingBook = await BookModel.findOne({ slug: slug });

        console.log(existingBook);

        if (existingBook) {
            slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
        }

        this.slug = slug;

        next();
    } catch (error) {
        next(error);
    }
});

const BookModel = mongoose.model("Book", BookSchema);

BookModel.createIndexes({ name: "text" });
export default BookModel;
