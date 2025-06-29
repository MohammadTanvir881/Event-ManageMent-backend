"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        errorSource,
        statusCode,
        message: "Invalid Id"
    };
};
exports.default = handleCastError;
