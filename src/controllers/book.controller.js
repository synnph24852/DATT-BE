import * as BookService from "~/services/book.service";

class BookController {
    async index(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const [posts, totalPost] = await Promise.all([BookService.getAll(req.query), BookService.countDocuments()]);
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
            const book = await BookService.getById(req.params.id);

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
            const book = await BookService.getBySlug(req.params.slug);

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
            const book = await BookService.create(req.body);

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
            const posts = await BookService.update(req.params.id, req.body);

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
            const posts = await BookService.destroy(req.params.id);

            return res.status(200).json({
                message: "Remove post successfully",
                data: posts,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
}

export default new BookController();
