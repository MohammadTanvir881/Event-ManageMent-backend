"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .min(1, "Name cannot be empty"),
        image: zod_1.z
            .string({
            required_error: "Image is required",
        })
            .min(1, "Image link cannot be empty"),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email format"),
        session: zod_1.z
            .string({
            required_error: "Session is required",
        })
            .min(1, "Session cannot be empty"),
        depertment: zod_1.z
            .string({
            required_error: "Department is required",
        })
            .min(1, "Department cannot be empty"),
        phone: zod_1.z
            .string({
            required_error: "Phone is required",
        })
            .min(9, "Phone must be at least 10 digits"),
        roll: zod_1.z
            .string({
            required_error: "Roll is required",
        })
            .min(1, "Roll cannot be empty"),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .min(6, "Password must be at least 6 characters long"),
        role: zod_1.z
            .enum(["admin", "user"], {
            invalid_type_error: "Role must be either 'admin' or 'user'",
        })
            .default("user"),
        isBlocked: zod_1.z.boolean().optional(),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "Old password is required",
        }),
        newPassword: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
exports.userValidation = {
    createUserValidationSchema: exports.createUserValidationSchema,
    changePasswordValidationSchema,
};
