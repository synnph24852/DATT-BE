import BookModel from "~/models/book.model";

export const searchBook = async (req, res) => {
    try {
        const keyword = req.query.q;
        const products = await BookModel.find({ $text: { $search: keyword } }, { _id: true, name: true, author: 1, avatar: true, slug: true });

        res.status(200).json({
            data: products,
        });
    } catch (error) {
        console.log(error);
    }
};
