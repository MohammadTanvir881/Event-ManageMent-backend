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
exports.totalRevenueIncome = void 0;
const orders_model_1 = require("./orders.model");
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenueData = yield orders_model_1.Order.aggregate([
        {
            $addFields: {
                product: { $toObjectId: "$product" },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "product",
                foreignField: "_id",
                as: "bookDetails",
            },
        },
        { $unwind: "$bookDetails" },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: { $multiply: ["$bookDetails.price", "$quantity"] },
                },
            },
        },
    ]);
    return revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
});
exports.totalRevenueIncome = {
    calculateRevenue,
};
