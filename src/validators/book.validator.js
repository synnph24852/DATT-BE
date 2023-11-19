import Joi from "joi";

export const validation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        author: Joi.string().required(),
        price: Joi.number().required(),
        original_price: Joi.number().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required(),
        avatar: Joi.string().required(),
        images: Joi.array(),
        category_id: Joi.string(),
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
