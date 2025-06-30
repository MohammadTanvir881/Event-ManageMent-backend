import { Event } from "../Event/event.model";
import { JoinedEvent } from "./JoinEvents.model";

const createJoinedEventsIntoDb = async (joinedEvent: any) => {
  console.log("Creating joined event in DB:", joinedEvent);
  const event = await Event.findById(joinedEvent.eventId);
  if (!event) {
    throw new Error("Event not found");
  }
  // 2. Increment attendee count
  event.attendeeCount = (event.attendeeCount || 0) + 1;

  // 3. Save updated event
  await event.save();

  console.log("Updated attendee count:", event.attendeeCount);
  const result = await JoinedEvent.create(joinedEvent);

  return result;
};

const getJoinedEventsFromDb = async () => {
  const result = await JoinedEvent.find();
  return result;
};

export const JoinEventService = {
  createJoinedEventsIntoDb,
  getJoinedEventsFromDb,
};
