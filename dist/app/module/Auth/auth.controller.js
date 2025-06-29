"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../utlis/catchAsync"));
const auth_services_1 = require("./auth.services");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.loginUser(req.body);
    const { refreshToken } = result;
    console.log(refreshToken);
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV === "development",
        httpOnly: true,
        // sameSite: 'none',
        // maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    res.status(200).json({
        success: true,
        message: "User login successfully",
        statusCode: 201,
        data: result,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    const result = yield auth_services_1.AuthServices.refreshToken(refreshToken);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Access token is retrieved succesfully!",
        data: result,
    });
}));
exports.AuthController = {
    loginUser,
    refreshToken,
};
