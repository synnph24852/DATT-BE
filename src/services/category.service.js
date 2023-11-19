import CategoryModel from "~/models/category.model";

export const getAll = async (options) => {
    const { skip, limit, sort, ...params } = options;
    // return await CategoryModel.aggregate([{ $project: { document: "$$ROOT" } }]);
    const res = await CategoryModel.find({});
    return res;
};

export const countDocuments = async () => {
    return await CategoryModel.countDocuments();
};

export const getById = async (bookId) => {
    return await CategoryModel.findById(bookId);
};

export const getBySlug = async (slug) => {
    const res = await CategoryModel.aggregate([
        { $match: { slug } },
        {
            $lookup: {
                from: "book",
                localField: "_id",
                foreignField: "category_id",
                as: "books",
            },
        },
        // {
        //     $unwind: "$category",
        // },
        {
            $project: {
                name: 1,
                slug: 1,
                books: {
                    name: 1,
                    slug: 1,
                    price: 1,
                    avatar: 1,
                    original_price: 1,
                    author: 1,
                    quantity_sold: 1,
                    quantity: 1,
                    category_id: 1,
                    createdAt: 1,
                },
                createdAt: 1,
            },
        },
    ]);

    return res[0] ? res[0] : null;
};

export const create = async (category) => {
    const product = new CategoryModel(category);
    return await product.save();
};
export const update = async (id, data) => {
    return await CategoryModel.findByIdAndUpdate(id, data, { new: true });
};
export const destroy = async (id) => {
    return await CategoryModel.findByIdAndDelete(id);
};
