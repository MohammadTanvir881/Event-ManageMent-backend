"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema
const blogsZodValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Blogs Title Are Required"),
        bookImage: zod_1.z.string(),
        category: zod_1.z.string().min(1, "Category is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        isDeleted: zod_1.z.boolean().optional(),
        booksLink: zod_1.z.string().min(1, "Books Link is Required"),
    }),
});
exports.default = blogsZodValidationSchema;
