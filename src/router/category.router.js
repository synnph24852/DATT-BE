import express from "express";
import CategoryController from "~/controllers/category.controller";
import * as CategoryValidator from "~/validators/category.validator";

const routerCategory = express.Router();

routerCategory.route("/get-slug/:slug").get(CategoryController.getBySlug)
routerCategory.route("/:id").get(CategoryController.getById).put(CategoryController.update).delete(CategoryController.remove);
routerCategory.route("/").get(CategoryController.index).post(CategoryValidator.validation, CategoryController.create);

export default routerCategory;
