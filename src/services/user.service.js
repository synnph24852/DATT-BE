import UserModel from "~/models/user.model";

export const getAll = async (options) => {
    const { page = 1, limit = 10, sort = "createdAt", fieldSearch, search, order = -1, ...query } = options;
    const skip = (page - 1) * limit;
    const sortOptions = {
        [sort]: order === 1 ? 1 : -1,
    };

    return await UserModel.find(query)
        .select({ fullname: 1, email: 1, avatar: 1, role: 1, phone: 1, address: 1 })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
};

export const countDocuments = async () => {
    return await UserModel.countDocuments();
};

export const getById = async (paymentId) => {
    return await UserModel.findById(paymentId);
};

export const destroy = async (userId) => {
    return await UserModel.findByIdAndDelete(userId);
};
