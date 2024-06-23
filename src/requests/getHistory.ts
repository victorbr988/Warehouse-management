import { instance } from "@/lib/axios"

interface IHistory {
  take?: number;  
  skip?: number;
}

export async function getHistory({ take, skip }: IHistory) {
  try {
    const response = await instance.get(`/history/list?take=${take}&skip=${skip}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}