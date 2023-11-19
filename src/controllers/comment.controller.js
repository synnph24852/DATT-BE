import * as CommentService from '~/services/comment.service'

class CommentController {
    async index(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const [comments, totalComment] = await Promise.all([CommentService.getAll(req.query), CommentService.countDocuments()]);
            return res.status(200).json({
                message: "Get all comments successfully",
                length: comments.length || 0,
                data: comments,
                currentPage: req.query.page || 1,
                totalPage: Math.ceil(totalComment / limit),
                total: totalComment,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async getById(req, res, next) {
        try {
            const comment = await CommentService.getById(req.params.id);

            return res.status(200).json({
                message: "Get all comments successfully",
                data: comment,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async create(req, res, next) {
        try {
            const comment = await CommentService.create(req.body);

            return res.status(200).json({
                message: "Create comment successfully",
                data: comment,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }

    async update(req, res, next) {
        try {
            const comment = await CommentService.update(req.params.id, req.body);

            return res.status(200).json({
                message: "Update comment successfully",
                data: comment,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
    async remove(req, res, next) {
        try {
            const comment = await CommentService.remove(req.params.id);

            return res.status(200).json({
                message: "Remove comment successfully",
                data: comment,
            });
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    }
}

export default new CommentController();
