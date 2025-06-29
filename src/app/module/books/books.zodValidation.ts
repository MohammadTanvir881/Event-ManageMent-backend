import { z } from "zod";

// Define the Zod schema
const BooksValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author is required",
    }),
    bookImage: z
      .string({
        required_error: "Book image URL is required",
      })
      .url("Book image must be a valid URL"),
    downloadLink: z
      .string({
        required_error: "Download link is required",
      })
      .url("Download link must be a valid URL"),
  }),
});

export const BooksZodValidation = {
  BooksValidationSchema,
};
