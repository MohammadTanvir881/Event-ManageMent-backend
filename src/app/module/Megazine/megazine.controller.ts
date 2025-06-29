import catchAsync from "../utlis/catchAsync";
import { megazineServices } from "./megazine.services";

const createMegazine = catchAsync(async (req, res) => {
  // console.log(req.file);
  console.log(req.body);
  const result = await megazineServices.createMegazineIntoDb(req.body);
  res.status(200).json({
    success: true,
    message: "Megazine Created successfully",
    statusCode: 200,
    data: result,
  });
});

// get all megazines
const getAllMegazines = catchAsync(async (req, res) => {
  const result = await megazineServices.getAllMegazinesFromDb();
  res.status(200).json({
    success: true,
    message: "All Megazines fetched successfully",
    statusCode: 200,
    data: result,
  });
});

export const megazineController = {
  createMegazine,
  getAllMegazines,
};
