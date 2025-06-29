import { Router } from "express";
import auth from "../Auth/auth";
import validateRequest from "../utlis/validateRequest";
import { megazineValidation } from "./megazine.validation";
import { megazineController } from "./megazine.controller";

const route = Router();
// get all megazines
route.get("/", megazineController.getAllMegazines);
// create megazine
route.post(
  "/",
  auth("admin"),
  validateRequest(megazineValidation.createMegazineValidationSchema),
  megazineController.createMegazine
);

export const MegazineRouter = route;
