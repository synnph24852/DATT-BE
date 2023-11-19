import * as OrderService from "~/services/order.service";

class OrderController {
    async index(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const [posts, totalPost] = await Promise.all([OrderService.getAll(req.query), OrderService.countDocuments()]);
            return res.status(200).json({
                message: "Get all book successfully",
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
            const book = await OrderService.getById(req.params.id);

            return res.status(200).json({
                message: "Successfully",
                data: book,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
    async getBySlug(req, res, next) {
        try {
            const book = await OrderService.getBySlug(req.params.slug);

            return res.status(200).json({
                message: "Get book successfully",
                data: book,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async create(req, res, next) {
        try {
            const book = await OrderService.create(req.body);

            return res.status(200).json({
                message: "Create book successfully",
                data: book,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async update(req, res, next) {
        try {
            const posts = await OrderService.update(req.params.id, req.body);

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
            const posts = await OrderService.destroy(req.params.id);

            return res.status(200).json({
                message: "Remove post successfully",
                data: posts,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
}

export default new OrderController();
