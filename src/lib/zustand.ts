import { create } from "zustand"
import { persist } from "zustand/middleware"

export enum FormType {
  ENTRANCE = "1",
  EXIT = "2",
  PRODUCT = "3",
  NONE = "4",
}

interface IForm {
  action: FormType
  setModal: (action: FormType) => void
}

export const useFormStore = create<IForm>((set) => ({
  action: FormType.NONE,
  setModal: (action: FormType) => set({ action })
}))

interface IUser {
  id: string
  name: string
  email: string,
  setUser: (userParam: IUser) => void
}

export const userStore = create<IUser>()(
  persist(
    set => ({
      id: "",
      name: "",
      email: "",
      setUser: (userParam: IUser) => set(() => (userParam)),
    }),
    { name: "user", skipHydration: true }
  )
)