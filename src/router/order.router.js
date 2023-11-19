import express from "express";
import * as OrderValidator from "~/validators/order.validator";
import OrderController from "~/controllers/order.controller";

const routerOrder = express.Router();

routerOrder.route("/:id").get(OrderController.getById).put( OrderController.update).delete(OrderController.remove);
routerOrder.route("/").get(OrderController.index).post(OrderValidator.validation, OrderController.create);

export default routerOrder;
