import { Router } from "express";
import { booksRoutes } from "../books/books.route";
import orderRouter from "../orders/order.routes";
import { AuthRoute } from "../Auth/auth.route";
import { UserRouter } from "../Users/user.routes";
import { MegazineRouter } from "../Megazine/megazine.router";
import { EventRouter } from "../Event/event.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/books",
    route: booksRoutes,
  },
  {
    path: "/orders",
    route: orderRouter,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/events",
    route: EventRouter,
  },
  {
    path: "/megazine",
    route: MegazineRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
