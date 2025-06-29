import { Schema, model } from "mongoose";
import { IBlogs } from "./blogs.interface";

const blogSchema = new Schema<IBlogs>(
  {
    title: {
      type: String,
      required: [true, "Books Title Are Required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Book Image is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBlogs>("Blog", blogSchema);
