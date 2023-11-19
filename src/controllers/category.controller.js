import * as CategoryService from "~/services/category.service";

class CategoryController {
    async index(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const [categories, totalPost] = await Promise.all([CategoryService.getAll(req.query), CategoryService.countDocuments()]);
            return res.status(200).json({
                message: "Get all book successfully",
                length: categories.length || 0,
                data: categories,
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
            const post = await CategoryService.getById(req.params.id);

            return res.status(200).json({
                message: "Get all posts successfully",
                data: post,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async getBySlug(req, res, next) {
        try {
            const category = await CategoryService.getBySlug(req.params.slug);

            return res.status(200).json({
                message: "successfully",
                data: category,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async create(req, res, next) {
        try {
            const post = await CategoryService.create(req.body);

            return res.status(200).json({
                message: "Create post successfully",
                data: post,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async update(req, res, next) {
        try {
            const posts = await CategoryService.update(req.params.id, req.body);

            return res.status(200).json({
                message: "Update post successfully",
                data: posts,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async remove(req, res, next) {
        try {
            const posts = await CategoryService.destroy(req.params.id);

            return res.status(200).json({
                message: "Remove post successfully",
                data: posts,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
}

export default new CategoryController();
