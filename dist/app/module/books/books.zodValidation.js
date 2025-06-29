"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema
const blogsZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Books Title Are Required"),
        description: zod_1.z.string().min(1, "Description is required"),
        isDeleted: zod_1.z.boolean().optional(),
        image: zod_1.z.string().min(1, "Blog Image is Required"),
    }),
});
exports.default = blogsZodValidationSchema;
