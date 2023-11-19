import express from "express";
import AuthController from "~/controllers/auth.controller";
import { verifyToken } from "~/middleware/verifyToken";
import { loginValidator, registerValidator } from "~/validators/auth.validator";

const routerAuth = express.Router();

routerAuth.route("/login").post(loginValidator, AuthController.login);
routerAuth.route("/register").post(registerValidator, AuthController.register);
routerAuth.route("/current-user").get(verifyToken, AuthController.getUserLogin);

export default routerAuth;
