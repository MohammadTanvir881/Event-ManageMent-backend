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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("../Users/user.model");
const auth_utlis_1 = require("./auth.utlis");
const config_1 = __importDefault(require("../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    // check if the user is blocked deleted
    const isBlocked = user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(500, "This user is Blocked");
    }
    // check the password
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(500, "Wrong Password");
    }
    // jwt Access Token
    const jwtPayload = {
        userEmail: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        _id: user === null || user === void 0 ? void 0 : user._id,
    };
    const token = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.access_Token_secret, config_1.default.access_token_expire_in);
    const refreshToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.refresh_Token_secret, config_1.default.refresh_token_expire_in);
    return {
        token,
        refreshToken,
    };
});
const refreshToken = (tokenFound) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = (0, auth_utlis_1.verifyToken)(tokenFound, config_1.default.refresh_Token_secret);
    const { userEmail, iat } = decoded;
    const user = yield user_model_1.User.findOne({ email: userEmail }).select("+password");
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    // check if the user is blocked deleted
    const isBlocked = user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(500, "This user is Blocked");
    }
    const jwtPayload = {
        userEmail: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        _id: user === null || user === void 0 ? void 0 : user._id,
    };
    const token = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.access_Token_secret, config_1.default.access_token_expire_in);
    return {
        token,
    };
});
exports.AuthServices = {
    loginUser,
    refreshToken,
};
