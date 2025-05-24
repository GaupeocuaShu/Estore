import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "price must have exactly two decimal places"
  );
export const insertProductSchema = z.object({
  name: z.string().min(3, "name must be at least 3 character"),
  slug: z.string().min(3, "slug must be at least 3 character"),
  category: z.string().min(3, "category must be at least 3 character"),
  brand: z.string().min(3, "brand must be at least 3 character"),
  description: z.string().min(3, "description must be at least 3 character"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "product must have at least 1 image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
