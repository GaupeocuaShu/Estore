import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";
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

// Scheme for signing users in

export const signInFormSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "name must be at least 3 characters"),
    email: z.string().email("Invalid Email Address"),
    password: z.string().min(6, "password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Cart Schemas
export const cartItemChema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a pos number"),
  image: z.string().min(1, "Image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemChema),
  itemsPrice: currency,
  totalPrice: currency,
  taxPrice: currency,
  shippingPrice: currency,
  sessionCartId: z.string().min(1, "session cart is is required"),
  userId: z.string().optional().nullable(),
});

// Schema for shipping address
export const ShippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  streetAddress: z.string().min(3, "Add must be at least 3 characters"),
  city: z.string().min(3, "Name must be at least 3 characters"),
  postalCode: z.string().min(3, "Name must be at least 3 characters"),
  country: z.string().min(3, "Name must be at least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Schema for payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "invalid payment method",
  });

// schema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid Payment Method",
  }),
  shippingAddress: ShippingAddressSchema,
});

// Schema for inserting an order Item

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});
