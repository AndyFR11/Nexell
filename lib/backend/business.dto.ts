
import { z } from "zod";

export const GetBusinessSchema = z.object({
  ruc: z.string().min(11, "Name is required"),
});

// export type GetBusinessDTO = z.infer<typeof GetBusinessSchema>


