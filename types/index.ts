import { insertProductSchema } from "@/lib/validators";
import { z } from "zod";
export type product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};
