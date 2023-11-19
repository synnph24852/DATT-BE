import BookModel from "~/models/book.model";

export const getAll = async (options) => {
    const { page = 1, limit = 10, sort = "createdAt", fieldSearch, search, order = -1, ...query } = options;
    const skip = (page - 1) * limit;
    const sortOptions = {
        [sort]: order === 1 ? 1 : -1,
    };

    return await BookModel.find(query)
        .select({ name: 1, slug: 1, price: 1, avatar: 1, original_price: 1, author: 1, quantity_sold: 1, quantity: 1, category_id: 1, createdAt: 1 })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
};

export const countDocuments = async () => {
    return await BookModel.countDocuments();
};

export const getBySlug = async (slug) => {
    const res = await BookModel.aggregate([
        { $match: { slug } },
        {
            $lookup: {
                from: "category",
                localField: "category_id",
                foreignField: "_id",
                as: "category",
            },
        },
        {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        },
        { $project: { __v: 0, category: { createdAt: 0, updatedAt: 0, __v: 0 } } },
    ]);

    return res[0] ? res[0] : null;
};

export const getById = async (bookId) => {
    return await BookModel.findById(bookId);
};

export const create = async (bookData) => {
    const book = new BookModel(bookData);
    const res = await book.save();
    return res;
};
export const update = async (id, book) => {
    return await BookModel.findByIdAndUpdate(id, book, { new: true });
};
export const destroy = async (bookId) => {
    return await BookModel.findByIdAndDelete(bookId);
};
