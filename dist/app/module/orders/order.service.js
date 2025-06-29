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
exports.orderServices = void 0;
const AppError_1 = __importDefault(require("../../Error/AppError"));
const books_model_1 = require("../books.model");
const orders_model_1 = require("./orders.model");
const getAllOrdersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = orders_model_1.Order.find();
    return result;
});
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity } = orderData;
    console.log({ orderData });
    // find the product from book collection
    const bookProduct = yield books_model_1.Book.findById(product);
    if (!bookProduct) {
        throw new Error("Product not found");
    }
    // The book quantity and order quantity is checking
    if (bookProduct.quantity < quantity) {
        throw new Error("Insufficient stock for the product");
    }
    // reduce book stock
    const updatedQuantity = bookProduct.quantity - quantity;
    bookProduct.quantity = updatedQuantity;
    if (updatedQuantity === 0) {
        bookProduct.inStock = false;
    }
    // save updated product
    yield bookProduct.save();
    const result = yield orders_model_1.Order.create(orderData);
    return result;
});
const updateOrderIntoDb = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderProduct = yield orders_model_1.Order.findById(orderId);
    if (!orderProduct) {
        throw new AppError_1.default(404, "Order Not Found");
    }
    const result = yield orders_model_1.Order.findByIdAndUpdate(orderId, { isShipped: true }, { new: true, runValidators: true });
    return result;
});
const deleteOrderIntoDb = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orders_model_1.Order.findById(orderId);
    if (!order) {
        throw new AppError_1.default(404, "Order not Found");
    }
    const result = yield orders_model_1.Order.findByIdAndDelete(orderId);
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getAllOrdersFromDb,
    updateOrderIntoDb,
    deleteOrderIntoDb,
};
