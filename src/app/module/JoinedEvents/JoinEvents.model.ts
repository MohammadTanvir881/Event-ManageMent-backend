
import { Schema, model } from "mongoose";
import { IJoinedEvent } from "./JoinEvents.interface";


const joinEventSchema = new Schema<IJoinedEvent>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const JoinedEvent = model<IJoinedEvent>("JoinEvent", joinEventSchema);
