"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email format"),
        product: zod_1.z.string(),
        quantity: zod_1.z
            .number()
            .min(1)
            .positive("Quantity must be greater than zero")
            .int("Quantity must be an integer"),
        totalPrice: zod_1.z.number().positive("Total price must be greater than zero"),
        address: zod_1.z.string(),
        phone: zod_1.z.number(),
    }),
});
exports.OrderValidation = {
    orderValidationSchema: exports.orderValidationSchema,
};
