import UserModel from "~/models/user.model";
import bcrypt from "bcrypt";
import generateToken from "~/utils/generateToken";

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userDb = await UserModel.findOne({ email });

            if (!userDb) {
                return res.status(400).json({ message: "Tài khoản chưa được đăng ký trong hệ thống" });
            }

            const isMatchPassword = await bcrypt.compare(password, userDb.password);

            if (!isMatchPassword) {
                return res.status(400).json({ message: "Sai username hoặc password" });
            }

            const token = await generateToken({ _id: userDb._id, email, role: userDb?.role });
            const refeshToken = await generateToken({ _id: userDb._id, email, role: userDb?.role }, "1d");

            return res.status(201).json({
                message: "Đăng nhập thành công",
                accessToken: token,
                refeshToken,
                data: {
                    _id: userDb._id,
                    fullname: userDb.fullname,
                    email,
                    avatar: userDb.avatar,
                    role: userDb.role,
                },
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async register(req, res, next) {
        try {
            const { email, password, fullname } = req.body;
            const userDb = await UserModel.findOne({ email });
            if (userDb) {
                return res.status(400).json({ message: "Tài khoản đã tồn tại trong hệ thống" });
            }

            const salt = await bcrypt.genSalt(10);

            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = new UserModel({ fullname, email, password: passwordHash });
            const user = await newUser.save();

            if (!user) {
                return res.status(500).json({ error: true, message: "Internal serve error" });
            }

            const token = await generateToken({ _id: user._id, email, role: user?.role });
            const refeshToken = await generateToken({ _id: user._id, email, role: userDb?.role }, "1d");

            return res.status(201).json({
                message: "Đăng ký tài khoản thành công",
                accessToken: token,
                refeshToken,
                data: {
                    fullname,
                    email,
                    avatar: user.avatar,
                },
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    getUserLogin(req, res, next) {
        try {
            return res.status(200).json({ info: req.user, message: "Authenticate successfully" });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
}

export default new AuthController();
