import { z } from "zod";
export const orderFormSchema = z.object({
  pickup: z.object({
    name: z.string().min(1),
    phone_number: z
      .string()
      .min(8, { message: "Phone Number is required" })
      .max(13, { message: "Invalid" }),
    landmark: z.object({
      address_line1: z.string(),
      address_line2: z.string(),
      formatted: z.string(),
      lat: z.number(),
      lon: z.number(),
    }),
    address: z.string().min(4, {
      message: "Address is required",
    }),
  }),
  dropoff: z.object({
    name: z.string().min(1),
    phone_number: z
      .string()
      .min(8, { message: "Phone Number is required" })
      .max(13, { message: "Invalid" }),
    landmark: z.object({
      address_line1: z.string(),
      address_line2: z.string(),
      formatted: z.string(),
      lat: z.number(),
      lon: z.number(),
    }),
    address: z.string().min(4, {
      message: "Address is required",
    }),
  }),
  total_delivery_cost: z.string(),
});

export type orderFormSchemaType = z.infer<typeof orderFormSchema>;
