import { instance } from "@/lib/axios"

interface IProduct {
  name: string
}

export async function postProduct(product: IProduct) {
  await instance.post("/product/create", product)
}