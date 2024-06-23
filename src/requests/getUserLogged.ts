import { instance } from "@/lib/axios";
import { userStore } from "@/lib/zustand";

export async function getUserLogged() {
  const { setUser } = userStore.getState()
  const user = await instance.get("/user/logged")
  setUser(user.data);
}