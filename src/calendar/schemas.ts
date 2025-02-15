import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  startTime: z.object(
    {
      hour: z.number(),
      minute: z.number(),
    },
    {
      required_error: "Start time is required",
    }
  ),
  endDate: z.date({
    required_error: "End date is required",
  }),
  endTime: z.object(
    {
      hour: z.number(),
      minute: z.number(),
    },
    {
      required_error: "End time is required",
    }
  ),
  variant: z.enum(["blue", "green", "red", "yellow", "purple", "gray"], {
    required_error: "Variant is required",
  }),
});

export type TEventFormData = z.infer<typeof eventSchema>;
