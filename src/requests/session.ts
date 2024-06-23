import { instance } from "@/lib/axios";
import { ILogin } from "./interfaces/login";
import { getUserLogged } from "./getUserLogged";

export async function getSession({ email, password}: ILogin) {
  await instance.post("/session/create", { email, password })
  await getUserLogged()
}