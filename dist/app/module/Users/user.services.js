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
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../config"));
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const blockUserIntoDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userStatus) {
        throw new AppError_1.default(500, "This user is already blocked");
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true, runValidators: true });
    return result;
});
const activatedUserIntoDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true, runValidators: true });
    return result;
});
const makeUserToAdminIntoDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userStatus) {
        throw new AppError_1.default(500, "This user is already blocked");
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { role: "admin" }, { new: true, runValidators: true });
    return result;
});
const makeAdminToUserIntoDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userStatus) {
        throw new AppError_1.default(500, "This user is already blocked");
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { role: "user" }, { new: true, runValidators: true });
    return result;
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User Data from Backed", userData);
    const user = yield user_model_1.User.findOne({ email: userData.userEmail }).select("+password");
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userStatus) {
        throw new AppError_1.default(500, "This user is already blocked");
    }
    const hashedPassword = user.password;
    console.log(hashedPassword);
    console.log("Old Password", payload.oldPassword);
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.oldPassword, hashedPassword);
    if (!isPasswordMatched) {
        throw new AppError_1.default(500, "Password Do Not March , Enter a correct Password");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_round));
    const result = yield user_model_1.User.findOneAndUpdate({
        email: userData.userEmail,
        role: userData.role,
    }, {
        password: newHashedPassword,
    });
    return result;
});
exports.UserServices = {
    createUserIntoDb,
    getAllUserFromDb,
    blockUserIntoDb,
    activatedUserIntoDb,
    makeUserToAdminIntoDb,
    makeAdminToUserIntoDb,
    changePassword,
};
