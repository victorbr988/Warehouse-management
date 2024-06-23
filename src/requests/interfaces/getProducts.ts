import { instance } from "@/lib/axios"

export async function getProducts() {
  try {
    const response = await instance.get("/product/list")
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}