"use server";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCT_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";
import { product } from "@/types";
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCT_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data);
}
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug: slug } });
}
