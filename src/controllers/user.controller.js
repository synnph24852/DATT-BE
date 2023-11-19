import * as UserService from "~/services/user.service";

class UserController {
    async index(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const [posts, totalPost] = await Promise.all([UserService.getAll(req.query), UserService.countDocuments()]);
            return res.status(200).json({
                message: "Get all user successfully",
                length: posts.length || 0,
                data: posts,
                currentPage: req.query.page || 1,
                totalPage: Math.ceil(totalPost / limit),
                total: totalPost,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async getById(req, res, next) {
        try {
            const post = await UserService.getById(req.params.id);

            return res.status(200).json({
                message: "Get user successfully",
                data: post,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async remove(req, res, next) {
        try {
            const posts = await UserService.destroy(req.params.id);

            return res.status(200).json({
                message: "Remove post successfully",
                data: posts,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
}

export default new UserController();
