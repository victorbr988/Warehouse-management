import { instance } from "@/lib/axios";

export async function getProductReport(slug: string) {
  const product = await instance.get(`/product/${slug}`)
  return product.data
}