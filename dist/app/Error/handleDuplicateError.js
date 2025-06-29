"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    // Regex to extract text inside double quotes
    const regex = /"([^"]+)"/;
    const match = err.message.match(regex);
    const extractedMessage = match && match[1];
    const errorSource = [
        {
            path: '',
            message: `${extractedMessage} is already Exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: err === null || err === void 0 ? void 0 : err.message,
        errorSource,
    };
};
exports.default = handleDuplicateError;
