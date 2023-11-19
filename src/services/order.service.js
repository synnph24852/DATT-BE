import OrderModel from "~/models/order.model";

export const getAll = async (options) => {
    const { page = 1, limit = 10, sort = "createdAt", order = -1, ...query } = options;
    const skip = (page - 1) * limit;
    const sortOptions = {
        [sort]: order === 1 ? 1 : -1,
    };

    return await OrderModel.aggregate([
        { $match: query },
        {
            $unwind: "$books",
        },
        {
            $set: {
                "books.book_id": { $toObjectId: "$books.book_id" },
            },
        },
        {
            $lookup: {
                from: "book",
                localField: "books.book_id",
                foreignField: "_id",
                as: "book",
            },
        },
        {
            $project: {
                products: 1,
                user_id: 1,
                status: 1,
                total_price: 1,
                createdAt: 1,
                updatedAt: 1,
                books: {
                    $mergeObjects: [{ book: { $arrayElemAt: ["$book", 0] } }, { amount: "$books.amount" }],
                },
            },
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    products: "$products",
                    user_id: "$user_id",
                    status: "$status",
                    total_price: "$total_price",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                },
                books: { $push: "$books" },
            },
        },
        {
            $project: {
                _id: "$_id._id",
                user_id: "$_id.user_id",
                status: "$_id.status",
                total_price: "$_id.total_price",
                createdAt: "$_id.createdAt",
                updatedAt: "$_id.updatedAt",
                books: {
                    $map: {
                        input: "$books",
                        as: "item",
                        in: {
                            amount: "$$item.amount",
                            book: {
                                name: "$$item.book.name",
                                avatar: "$$item.book.avatar",
                                price: "$$item.book.price",
                            },
                        },
                    },
                },
            },
        },
    ]);
};

export const countDocuments = async () => {
    return await OrderModel.countDocuments();
};

export const getBySlug = async (slug) => {
    const res = await OrderModel.aggregate([
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
    return await OrderModel.findById(bookId);
};

export const create = async (orderData) => {
    const order = new OrderModel(orderData);
    const res = await order.save();
    return res;
};
export const update = async (id, book) => {
    return await OrderModel.findByIdAndUpdate(id, book, { new: true });
};

export const updateStatusOrder = async (id, book) => {
    // return await OrderModel.up(id, book, { new: true });
};

export const destroy = async (bookId) => {
    return await OrderModel.findByIdAndDelete(bookId);
};
