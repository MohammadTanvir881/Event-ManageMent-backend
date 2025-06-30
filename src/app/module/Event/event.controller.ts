import catchAsync from "../utlis/catchAsync";
import { eventServices } from "./event.services";

const createEvent = catchAsync(async (req, res): Promise<void> => {
  // console.log(req.file);
  console.log(req.body);
  const result = await eventServices.createEventIntoDb(req.body);
  res.status(200).json({
    success: true,
    message: "Event Created successfully",
    statusCode: 200,
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res): Promise<void> => {
  const result = await eventServices.getAllEventsFromDb();
  res.status(200).json({
    success: true,
    message: "Events fetched successfully",
    statusCode: 200,
    data: result,
  });
});

const getSingleEvent = catchAsync(async (req, res): Promise<void> => {
  const { eventId } = req.params;
  const result = await eventServices.getSingleEventFromDb(eventId);
  if (!result) {
    res.status(404).json({
      success: false,
      message: "Event not found",
      statusCode: 404,
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: "Event fetched successfully",
    statusCode: 200,
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res): Promise<void> => {
  const { eventId } = req.params;
  const result = await eventServices.updateEventIntoDb(eventId, req.body);
  if (!result) {
    res.status(404).json({
      success: false,
      message: "Event not found",
      statusCode: 404,
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    statusCode: 200,
    data: result,
  });
});

export const eventController = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
};
