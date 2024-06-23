import { instance } from "@/lib/axios";

interface IMoviment {
  productId: string;
  type: string;
  quantity: number;
}
export async function postMoviment({ productId, type, quantity }: IMoviment) {
  await instance.post("/history/create", { productId, type, quantity })
}