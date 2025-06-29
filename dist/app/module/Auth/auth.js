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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utlis/catchAsync"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../Users/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenFromFrontend = req.headers.authorization;
        if (!tokenFromFrontend) {
            throw new AppError_1.default(401, "Unauthorized Access");
        }
        const tokenModified = tokenFromFrontend === null || tokenFromFrontend === void 0 ? void 0 : tokenFromFrontend.toString().split(" ");
        // console.log(tokenModified);
        const token = tokenModified[1];
        // console.log("from auth", token);
        if (!token) {
            throw new AppError_1.default(401, "Unauthorized Access");
        }
        // check the token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_Token_secret);
        const { userEmail, role } = decoded;
        const user = yield user_model_1.User.findOne({ email: userEmail });
        if (!user) {
            throw new AppError_1.default(404, "User Not Found");
        }
        // check if the user is blocked 
        const isBlocked = user.isBlocked;
        if (isBlocked) {
            throw new AppError_1.default(500, "This user is Blocked");
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(401, "Unauthorized Access");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
