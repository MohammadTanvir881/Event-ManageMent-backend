import { Schema, model } from "mongoose";
import { IMagazine } from "./magazine.interface";

const megazineSchema = new Schema<IMagazine>(
  {
    title: {
      type: String,
      required: true,
    },
    magazineImage: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    downloadLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Megazine = model<IMagazine>("Megazine", megazineSchema);
