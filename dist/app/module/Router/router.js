"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_route_1 = require("../books/books.route");
const order_routes_1 = __importDefault(require("../orders/order.routes"));
const auth_route_1 = require("../Auth/auth.route");
const user_routes_1 = require("../Users/user.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/books",
        route: books_route_1.booksRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute,
    },
    {
        path: "/users",
        route: user_routes_1.UserRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
