import { z } from "zod";

// Define the Zod schema
const blogsZodValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Blogs Title Are Required"),
    bookImage: z.string(),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    isDeleted: z.boolean().optional(),
    booksLink: z.string().min(1, "Books Link is Required"),
  }),
});

export default blogsZodValidationSchema;
