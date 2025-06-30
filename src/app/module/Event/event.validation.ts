import { z } from "zod";

export const createEventValidationSchema = z.object({
  body: z.object({
    eventTitle: z.string({
      required_error: "Event title is required",
    }),
    authorName: z.string({
      required_error: "Author name is required",
    }),
    eventDate: z.string({
      required_error: "Event date is required",
    }),
    eventTime: z.string({
      required_error: "Event time is required",
    }),
    eventLocation: z.string({
      required_error: "Event location is required",
    }),
    eventDescription: z.string({
      required_error: "Event description is required",
    }),
    attendeeCount: z.number().optional().default(0),
  }),
});

export const updateEventValidationSchema = z.object({
  body: z.object({
    eventTitle: z
      .string({
        required_error: "Event title is required",
      })
      .optional(),
    authorName: z
      .string({
        required_error: "Author name is required",
      })
      .optional(),
    eventDate: z
      .string({
        required_error: "Event date is required",
      })
      .optional(),
    eventTime: z
      .string({
        required_error: "Event time is required",
      })
      .optional(),
    eventLocation: z
      .string({
        required_error: "Event location is required",
      })
      .optional(),
    eventDescription: z
      .string({
        required_error: "Event description is required",
      })
      .optional(),
    attendeeCount: z.number().optional().default(0),
  }),
});

export const eventValidation = {
  createEventValidationSchema,
  updateEventValidationSchema,
};
