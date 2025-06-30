import { Event } from "./event.model";

const createEventIntoDb = async (eventData: any) => {
  const result = await Event.create(eventData);
  return result;
};

const getAllEventsFromDb = async () => {
  const result = await Event.find().sort({createdAt: -1});
  return result;
};

const getSingleEventFromDb = async (eventId: string) => {
  const result = await Event.findById(eventId);
  return result;
};

const updateEventIntoDb = async (eventId: string, eventData: any) => {
  const result = await Event.findByIdAndUpdate(eventId, eventData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteEventFromDb = async (eventId: string) => {
  const result = await Event.findByIdAndDelete(eventId);
  return result;
};




export const eventServices = {
  createEventIntoDb,
  getAllEventsFromDb,
  getSingleEventFromDb,
  updateEventIntoDb,
  deleteEventFromDb,
};
