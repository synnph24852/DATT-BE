import Joi from "joi";

export const validation = (req, res, next) => {
    const schema = Joi.object({
        user_id:Joi.string().required(),
        status: Joi.string(),
        books: Joi.array().items({
            book_id: Joi.string().required(),
            amount: Joi.number().required(),
        }),
        total_price: Joi.number().required(),
        address: Joi.string().required(),
    });

    const result = schema.validate(req.body);

    try {
        if (result.error) {
            return res.status(401).json({ error: 2, message: result.error.details[0].message });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            err: 1,
            message: new Error(err).message,
        });
    }
};
