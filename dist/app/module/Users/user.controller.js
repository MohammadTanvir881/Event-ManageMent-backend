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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../utlis/catchAsync"));
const user_services_1 = require("./user.services");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body, "User Data");
    const result = yield user_services_1.UserServices.createUserIntoDb(req.body);
    const { name, email, _id } = result;
    res.status(200).json({
        success: true,
        message: "User registered successfully",
        statusCode: 201,
        data: {
            _id,
            name,
            email,
        },
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.getAllUserFromDb();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User Retrieved Successfully",
        data: result,
    });
}));
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_services_1.UserServices.blockUserIntoDb(userId);
    res.status(200).json({
        success: true,
        message: "User Blocked successfully",
        statusCode: 200,
    });
}));
const activeUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_services_1.UserServices.activatedUserIntoDb(userId);
    res.status(200).json({
        success: true,
        message: "User Activated successfully",
        statusCode: 200,
    });
}));
const makeUserToAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_services_1.UserServices.makeUserToAdminIntoDb(userId);
    res.status(200).json({
        success: true,
        message: "User Updated To Admin successfully",
        statusCode: 200,
    });
}));
const makeAdminToUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_services_1.UserServices.makeAdminToUserIntoDb(userId);
    res.status(200).json({
        success: true,
        message: "Admin Updated To user successfully",
        statusCode: 200,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = __rest(req.body, []);
    console.log(passwordData);
    const result = yield user_services_1.UserServices.changePassword(req.user, passwordData);
    res.status(200).json({
        success: true,
        message: "Password Changed Successfully",
        statusCode: 200,
    });
}));
exports.UserController = {
    createUser,
    getAllUser,
    blockUser,
    activeUser,
    makeUserToAdmin,
    makeAdminToUser,
    changePassword,
};
