import { z } from "zod";
export const orderFormSchema = z.object({
  pickup: z.object({
    name: z.string().min(1, {
      message: "name is required",
    }),
    phone_number: z
      .string()
      .min(8, { message: "phone number is required" })
      .max(13, { message: "Invalid" }),
    landmark: z.object(
      {
        address_line1: z.string(),
        address_line2: z.string(),
        formatted: z.string(),
        lat: z.number(),
        lon: z.number(),
      },
      { message: "landmark is required" }
    ),
    address: z.string().min(4, {
      message: "address is required",
    }),
  }),
  dropoff: z.object({
    name: z.string().min(1, {
      message: "name is required",
    }),
    phone_number: z
      .string()
      .min(8, { message: "phone number is required" })
      .max(13, { message: "Invalid" }),
    landmark: z.object(
      {
        address_line1: z.string(),
        address_line2: z.string(),
        formatted: z.string(),
        lat: z.number(),
        lon: z.number(),
      },
      { message: "landmark is required" }
    ),
    address: z.string().min(4, {
      message: "address is required",
    }),
  }),
  total_delivery_cost: z.string(),
});

export type orderFormSchemaType = z.infer<typeof orderFormSchema>;
