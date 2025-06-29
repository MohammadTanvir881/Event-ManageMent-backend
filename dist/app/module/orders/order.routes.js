"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validateRequest_1 = __importDefault(require("../utlis/validateRequest"));
const order_zodValidation_1 = require("./order.zodValidation");
const auth_1 = __importDefault(require("../Auth/auth"));
const orderRouter = express_1.default.Router();
orderRouter.get("/", order_controller_1.orderController.getAllOrders);
orderRouter.post("/", (0, validateRequest_1.default)(order_zodValidation_1.OrderValidation.orderValidationSchema), order_controller_1.orderController.createOrder);
orderRouter.post("/success/:transId", order_controller_1.orderController.paymentSuccess);
// payment fail route
orderRouter.post("/fail/:transId", order_controller_1.orderController.paymentFail);
orderRouter.get("/revenue", order_controller_1.orderController.getRevenue);
orderRouter.patch("/updateOrder/:orderId", (0, auth_1.default)("admin"), order_controller_1.orderController.updateOrder);
orderRouter.delete("/orderDelete/:orderId", (0, auth_1.default)("admin"), order_controller_1.orderController.deleteOrder);
exports.default = orderRouter;
