"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../utlis/validateRequest"));
const user_validation_1 = require("../Users/user.validation");
const user_controller_1 = require("../Users/user.controller");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const route = (0, express_1.Router)();
route.post("/register", 
// auth("admin"),
(0, validateRequest_1.default)(user_validation_1.userValidation.createUserValidationSchema), user_controller_1.UserController.createUser);
route.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
route.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controller_1.AuthController.refreshToken);
exports.AuthRoute = route;
