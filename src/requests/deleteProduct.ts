import { instance } from "@/lib/axios";

export async function deleteProduct(productId: string) {
  await instance.delete(`/product/${productId}`)
}