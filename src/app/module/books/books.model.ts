import { Schema, model } from "mongoose";
import { IBooks } from "./books.inheritance";

const booksSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
      required: true,
    },
    bookImage: {
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

export const Books = model<IBooks>("Book", booksSchema);
