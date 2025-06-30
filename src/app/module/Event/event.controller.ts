import catchAsync from "../utlis/catchAsync";
import { eventServices } from "./event.services";

const createEvent = catchAsync(async (req, res) => {
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


export const eventController = {
  createEvent,
};