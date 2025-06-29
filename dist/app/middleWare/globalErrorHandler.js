"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../Error/AppError"));
const HandleCastError_1 = __importDefault(require("../Error/HandleCastError"));
const handleDuplicateError_1 = __importDefault(require("../Error/handleDuplicateError"));
const zod_1 = require("zod");
const handleValidationError_1 = __importDefault(require("../Error/handleValidationError"));
const handleZodValidationError_1 = __importDefault(require("../Error/handleZodValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 400;
    let message = "Validation Error";
    let errorSource = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifyError = (0, handleZodValidationError_1.default)(err);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorSource = simplifyError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifyError = (0, handleValidationError_1.default)(err);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorSource = simplifyError.errorSource;
    }
    else if (err.name === "CastError") {
        const simplifyError = (0, HandleCastError_1.default)(err);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorSource = simplifyError.errorSource;
    }
    else if (err.code === 11000) {
        const simplifyError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorSource = simplifyError.errorSource;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        status: false,
        message,
        errorSource,
        err,
        // stack: config.node_env === "development" ? err?.stack : null,
    });
};
exports.default = globalErrorHandler;
