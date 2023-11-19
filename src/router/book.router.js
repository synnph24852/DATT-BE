import express from "express";
import BookController from "~/controllers/book.controller";
import * as BookValidator from "~/validators/book.validator";

const routerBook = express.Router();

routerBook.route("/get-slug/:slug").get(BookController.getBySlug);
routerBook.route("/:id").get(BookController.getById).put(BookValidator.validation, BookController.update).delete(BookController.remove);
routerBook.route("/").get(BookController.index).post(BookValidator.validation, BookController.create);

export default routerBook;
