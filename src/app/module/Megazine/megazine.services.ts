import { Megazine } from "./magazine.model";

// create megazine into db
const createMegazineIntoDb = async (megazine: any) => {
  const result = await Megazine.create(megazine);
  return result;
};

// get all megazines
const getAllMegazinesFromDb = async () => {
  const result = await Megazine.find();
  return result;
};
export const megazineServices = {
  createMegazineIntoDb,
  getAllMegazinesFromDb,
};
