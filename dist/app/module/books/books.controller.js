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
exports.booksController = void 0;
const books_services_1 = require("./books.services");
const catchAsync_1 = __importDefault(require("../utlis/catchAsync"));
const createBookData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.file);
    console.log(req.body);
    const result = yield books_services_1.bookServices.createBookDataIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Books Created successfully",
        statusCode: 200,
        // data: result,
    });
}));
// get all the books data here
const getBooksData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield books_services_1.bookServices.getBooksDataFromDb(query);
        res.status(200).json({
            message: "Books retrieved successfully",
            status: true,
            res: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: false,
            error: error,
        });
    }
});
// get single book data using id here
const getSingleBookData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        // console.log(productId);
        const result = yield books_services_1.bookServices.getSingleBookDataFromDb(bookId);
        res.status(200).json({
            message: "Books retrieved successfully",
            status: true,
            res: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Product not found",
            status: false,
            error: error,
        });
    }
});
//  update a book here
const updateBookData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updateBookData = req.body;
        const result = yield books_services_1.bookServices.updateBookDataIntoDb(bookId, updateBookData);
        res.status(200).json({
            message: "Book updated successfully",
            status: true,
            res: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "something went wrong",
            status: false,
            error: error.message,
        });
    }
});
// delete book data here
const deleteBookData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield books_services_1.bookServices.deleteDataFromDB(bookId);
        res.status(200).json({
            message: "Book deleted successfully",
            status: true,
            res: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: false,
            error: error.message,
        });
    }
});
exports.booksController = {
    getBooksData,
    createBookData,
    getSingleBookData,
    updateBookData,
    deleteBookData,
};
