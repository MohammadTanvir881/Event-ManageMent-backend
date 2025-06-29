import { Router } from "express";
import validateRequest from "../utlis/validateRequest";
import { userValidation } from "../Users/user.validation";
import { UserController } from "../Users/user.controller";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "./auth";

const route = Router();

route.post(
  "/register",
  // auth("admin"),
  validateRequest(userValidation.createUserValidationSchema),
  UserController.createUser
);

route.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

route.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);

export const AuthRoute = route;
