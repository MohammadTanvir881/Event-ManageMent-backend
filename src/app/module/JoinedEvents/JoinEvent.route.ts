import { Router } from "express";
import validateRequest from "../utlis/validateRequest";
import { joinEventValidation } from "./JoinEvent.validation";
import { JoinEventController } from "./JoinEvent.controller";

const route = Router();

// create event
route.post(
  "/",
  validateRequest(joinEventValidation.joinEventValidationSchema),
  JoinEventController.createJoinedEvent
);

// get all events
route.get("/", JoinEventController.getAllJoinedEvent);



export const JoinedEventRouter = route;
