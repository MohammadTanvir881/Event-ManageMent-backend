import catchAsync from "../utlis/catchAsync";
import { JoinEventService } from "./JoinEvent.services";

const createJoinedEvent = catchAsync(async (req, res) => {
  const result = await JoinEventService.createJoinedEventsIntoDb(req.body);

  if (!result) {
    res.status(404).json({
      success: false,
      message: "Joined Event not found",
      statusCode: 404,
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: "Joined the event successfully",
    statusCode: 200,
    data: result,
  });
});


const getAllJoinedEvent = catchAsync(async (req, res) => {
  const result = await JoinEventService.getJoinedEventsFromDb();

  if (!result) {
    res.status(404).json({
      success: false,
      message: "join Event Event not found",
      statusCode: 404,
    });
    return;
  }
  res.status(200).json({
    success: true,
    message: "Data feached successfully",
    statusCode: 200,
    data: result,
  });
});




export const JoinEventController = {
  createJoinedEvent,
    getAllJoinedEvent
};
