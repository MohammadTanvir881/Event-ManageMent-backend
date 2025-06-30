import { Event } from "./event.model";

const createEventIntoDb = async (eventData: any) => {
    const result = await Event.create(eventData);
    return result;
}


export const eventServices = {
    createEventIntoDb,
};