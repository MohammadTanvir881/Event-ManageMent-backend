import { z } from "zod";

export const createMegazineValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    magazineImage: z.string({
      required_error: "Magazine image is required",
    }),
    author: z.string({
      required_error: "Author is required",
    }),
    downloadLink: z.string({
      required_error: "Download link is required",
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

export const megazineValidation = {
  createMegazineValidationSchema,
};
