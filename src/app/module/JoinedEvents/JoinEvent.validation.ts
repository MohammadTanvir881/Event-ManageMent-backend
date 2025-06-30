import { z } from "zod";

export const joinEventValidationSchema = z.object({
  body: z.object({
    userEmail: z.string({
      required_error: "User Email is required",
    }),
    eventId: z.string({
      required_error: "Event Id is required",
    })
  }),
});


export const joinEventValidation = {
  joinEventValidationSchema,
};