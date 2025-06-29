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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookServices = void 0;
const books_model_1 = require("./../books.model");
const mongoose_1 = require("mongoose"); // Import ObjectId from mongoose
// find all the books data from DB
const getBooksDataFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObject = Object.assign({}, query);
    console.log(query);
    // Initialize search query
    const searchQuery = {};
    // ✅ Handle text-based searches (author, category, title)
    if (query.author) {
        searchQuery.author = { $regex: query.author, $options: "i" };
    }
    if (query.category) {
        searchQuery.category = { $regex: query.category, $options: "i" };
    }
    if (query.search) {
        searchQuery.$or = [
            { title: { $regex: query.search, $options: "i" } },
            { author: { $regex: query.search, $options: "i" } },
            { category: { $regex: query.search, $options: "i" } },
        ];
    }
    // ✅ Price range filter
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
        const priceFilter = {};
        if (query.minPrice !== undefined && !isNaN(Number(query.minPrice))) {
            priceFilter.$gte = Number(query.minPrice);
        }
        if (query.maxPrice !== undefined && !isNaN(Number(query.maxPrice))) {
            priceFilter.$lte = Number(query.maxPrice);
        }
        if (Object.keys(priceFilter).length > 0) {
            searchQuery.price = priceFilter;
        }
    }
    // ✅ Ensure availability is a boolean
    if (query.availability !== undefined) {
        searchQuery.availability = query.availability === "true";
    }
    // ✅ Remove unwanted fields
    const excludeFields = ["search", "sortBy", "sortOrder"];
    excludeFields.forEach((el) => delete queryObject[el]);
    // ✅ Merge filters
    const filterQuery = books_model_1.Book.find(Object.assign(Object.assign({}, queryObject), searchQuery));
    // ✅ Sorting functionality with default sorting (newest first)
    if (typeof query.sortBy === "string" && query.sortBy.trim() !== "") {
        const order = query.sortOrder === "asc" ? 1 : -1;
        filterQuery.sort({ [query.sortBy]: order });
    }
    else {
        // ✅ Default sorting: newest products first
        filterQuery.sort({ createdAt: -1 });
    }
    // ✅ Execute query and populate author field
    const result = yield filterQuery;
    return result;
});
// find a single book data here
const getSingleBookDataFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Book.findOne({ _id: id });
    const objectId = new mongoose_1.Types.ObjectId(id);
    const result = yield books_model_1.Book.aggregate([{ $match: { _id: objectId } }]);
    if (result.length === 0) {
        throw Error("Book not found");
    }
    console.log(result);
    return result;
});
// create a new book data in DB
const createBookDataIntoDB = (books) => __awaiter(void 0, void 0, void 0, function* () {
    //send image to cloudinary
    const imageName = `${books === null || books === void 0 ? void 0 : books.title}-${books === null || books === void 0 ? void 0 : books.author}`;
    // const path = file?.path;
    // const { secure_url }: any = await sendImageToCloudinary(imageName, path);
    // books.bookImage = secure_url;
    const result = yield books_model_1.Book.create(books);
    return result;
});
// update the book data here
const updateBookDataIntoDb = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
    return result;
});
// delete the book data here
const deleteDataFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.updateOne({ _id: id }, { isDeleted: true });
    return result;
});
exports.bookServices = {
    getBooksDataFromDb,
    createBookDataIntoDB,
    getSingleBookDataFromDb,
    updateBookDataIntoDb,
    deleteDataFromDB,
};
