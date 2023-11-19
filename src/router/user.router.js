import express from "express";
import UserController from "~/controllers/user.controller";

const routerUser = express.Router();

routerUser.route("/:id").get(UserController.getById).delete(UserController.remove);
routerUser.route("/").get(UserController.index);

export default routerUser;
