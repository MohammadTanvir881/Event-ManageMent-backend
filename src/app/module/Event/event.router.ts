import { Router } from "express";
import validateRequest from "../utlis/validateRequest";
import { eventValidation } from "./event.validation";
import { eventController } from "./event.controller";


const route = Router();

// create event
route.post(
  "/",
  validateRequest(eventValidation.createEventValidationSchema),
  eventController.createEvent
);

export const EventRouter = route;
