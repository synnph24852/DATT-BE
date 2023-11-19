import jwt from "jsonwebtoken";
import UserModel from "~/models/user.model";
import "dotenv/config";

export const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập" });
        }
        const access_token = req.headers.authorization.split(" ")[1];

        jwt.verify(access_token, process.env.PRIVATE_KEY, async (error, payload) => {
            if (error) {
                return res.status(401).json({ message: error.name });
            }

            const currentUser = await UserModel.findById(payload._id);

            if (!currentUser) {
                return res.status(401).json({ message: "Token không hợp lệ" });
            }

            const { email, username, _id, role } = currentUser;
            req.user = { _id, email, username, role };
            next();
        });
    } catch (error) {
        console.log(error);
    }
};
