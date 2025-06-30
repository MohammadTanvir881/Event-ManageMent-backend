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

// get all events
route.get("/", eventController.getAllEvents);

// get single event by id
route.get("/:eventId", eventController.getSingleEvent);
// update event by id
route.patch(
  "/:eventId",
  validateRequest(eventValidation.updateEventValidationSchema),
  eventController.updateEvent
);

export const EventRouter = route;
