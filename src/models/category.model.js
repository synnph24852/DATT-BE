import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema(
    {
        name: { type: "string", required: true },
        slug: { type: String, unique: true },
        avatar: { type: String, default: "https://picsum.photos/300/300" },
        description: { type: String },
    },
    { collection: "category", timestamps: true }
);
CategorySchema.pre("save", async function (next) {
    try {
        let slug = slugify(this.name, {
            replacement: "-",
            lower: true,
            strict: false,
            locale: "vi",
            trim: true,
        });

        const existingBook = await CategoryModel.findOne({ slug: slug });

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

const CategoryModel = mongoose.model("category", CategorySchema);

export default CategoryModel;
