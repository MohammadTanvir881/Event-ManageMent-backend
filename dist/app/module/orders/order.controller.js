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
exports.orderController = void 0;
const SSLCommerzPayment = require("sslcommerz-lts");
const order_service_1 = require("./order.service");
const revenue_1 = require("./revenue");
const config_1 = __importDefault(require("../../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const orders_model_1 = require("./orders.model");
const catchAsync_1 = __importDefault(require("../utlis/catchAsync"));
// import { totalRevenueIncome } from "./revenue";
const tran_id = new mongoose_1.default.Types.ObjectId().toString();
const store_id = config_1.default.store_id;
const store_passwd = config_1.default.store_password;
const is_live = false; //true for live, false for sandbox
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.getAllOrdersFromDb();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Orders Retrieved Successfully",
        data: result,
    });
}));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        console.log(order);
        const data = {
            total_amount: order.totalPrice,
            currency: "BDT",
            tran_id: tran_id,
            success_url: `http://localhost:5000/api/orders/success/${tran_id}`,
            fail_url: `http://localhost:5000/api/orders/fail/${tran_id}`,
            cancel_url: `http://localhost:5000/api/orders/success/${tran_id}`,
            ipn_url: "http://localhost:3030/ipn",
            shipping_method: "Courier",
            product_name: "Computer.",
            product_category: "Electronic",
            product_profile: "general",
            cus_name: "Customer Name",
            cus_email: order.email,
            cus_add1: order.address,
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: order.phone,
            cus_fax: "01711111111",
            ship_name: "Customer Name",
            ship_add1: "Dhaka",
            ship_add2: "Dhaka",
            ship_city: "Dhaka",
            ship_state: "Dhaka",
            ship_postcode: 1000,
            ship_country: "Bangladesh",
        };
        console.log(data);
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then((apiResponse) => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL });
            const finalOrder = Object.assign(Object.assign({}, order), { paidStatus: false, tranjectionId: tran_id });
            console.log(finalOrder);
            const result = order_service_1.orderServices.createOrderIntoDB(finalOrder);
            console.log("Redirecting to: ", GatewayPageURL);
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something Went Wrong While Taking Order",
            status: false,
            error: error.message,
        });
    }
});
// Payment success route
const paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transId } = req.params;
    console.log("req.params.tranId)", transId);
    console.log(req.params.tranId);
    const result = yield orders_model_1.Order.updateOne({ tranjectionId: req.params.transId }, {
        $set: {
            paidStatus: true,
        },
    });
    if (result.modifiedCount > 0) {
        res.redirect(`http://localhost:5173/payment/success`);
    }
}));
const paymentFail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transId } = req.params;
    console.log(req.params.transId);
    const result = yield orders_model_1.Order.deleteOne({
        tranjectionId: req.params.transId,
    });
    if (result.deletedCount > 0) {
        res.redirect(`http://localhost:5173/payment/fail`);
    }
}));
// Payment fail route
const updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.orderServices.updateOrderIntoDb(orderId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Orders Updated Successfully",
        data: result,
    });
}));
const deleteOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.orderServices.deleteOrderIntoDb(orderId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Orders Deleted Successfully",
        data: result,
    });
}));
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield revenue_1.totalRevenueIncome.calculateRevenue();
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: {
                totalRevenue,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong while calculating revenue",
            status: false,
            error: error.message,
        });
    }
});
exports.orderController = {
    createOrder,
    paymentSuccess,
    paymentFail,
    getRevenue,
    getAllOrders,
    updateOrder,
    deleteOrder,
};
