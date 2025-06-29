"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BRCYPT_SALT_ROUNDS,
    access_Token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refresh_Token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    access_token_expire_in: process.env.JWT_ACCESS_TOKEN_EXPIREIN,
    refresh_token_expire_in: process.env.JWT_REFRESH_TOKEN_EXPIREIN,
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    store_id: process.env.STORE_ID,
    store_password: process.env.STORE_PASSWORD,
};
