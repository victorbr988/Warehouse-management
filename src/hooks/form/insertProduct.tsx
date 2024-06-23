"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome do produto é obrigatório" })
    .max(50, { message: "Nome muito longo, máximo 50 caracteres" }),
  quantity: z
    .coerce.number()
    .min(1, { message: "A quantidade deve ser maior que 0" }),
})

export function useInserProduct() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    }
  })

  return { register, handleSubmit, errors, formSchema, reset }
}