"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../Auth/auth"));
const validateRequest_1 = __importDefault(require("../utlis/validateRequest"));
const user_validation_1 = require("./user.validation");
const route = (0, express_1.Router)();
route.get("/", (0, auth_1.default)("admin", "user"), user_controller_1.UserController.getAllUser);
route.post("/changePassword", (0, auth_1.default)("admin", "user"), (0, validateRequest_1.default)(user_validation_1.userValidation.changePasswordValidationSchema), user_controller_1.UserController.changePassword);
route.patch("/block/:userId", (0, auth_1.default)("admin"), user_controller_1.UserController.blockUser);
route.patch("/active/:userId", (0, auth_1.default)("admin"), user_controller_1.UserController.activeUser);
route.patch("/makeAdmin/:userId", (0, auth_1.default)("admin"), user_controller_1.UserController.makeUserToAdmin);
route.patch("/makeUser/:userId", (0, auth_1.default)("admin"), user_controller_1.UserController.makeAdminToUser);
exports.UserRouter = route;
