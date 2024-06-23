"use client"

import { useFormStore } from "@/lib/zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  productId: z
    .string()
    .min(1, { message: "O Id do produto é obrigatório" }),
  type: z        
    .enum(["1", "2", "3", "4"], { message: "O tipo do produto deve ser entre Entrada, Saída ou Quantidade estoque" }),
  quantity: z
    .coerce.number()
    .min(1, { message: "A quantidade deve ser maior que 0" }),
})

export function useInserMoviment() {
  const { action } = useFormStore()
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      type: action as any,
      quantity: 0,
    }
  })

  return { register, handleSubmit, errors, formSchema, reset, control}
}