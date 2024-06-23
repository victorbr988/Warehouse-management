import { FiSave } from "react-icons/fi";
import { Form } from "@/components/Form";
import { Button } from "../../ui/button";
import { useInserMoviment } from "@/hooks/form/insertMoviment";
import { z } from "zod";
import { SelectProducts } from "../Select";
import { Controller } from "react-hook-form";
import { FormType, useFormStore } from "@/lib/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMoviment } from "@/requests/postMoviment";
import { ToastProvider } from "@/providers/ToastProvider";
import { Spin } from "../Spin";

export function InsertMovimentForm() {
  const { action } = useFormStore()
  const { register, handleSubmit, errors, reset, formSchema, control } = useInserMoviment()
  const queryClient = useQueryClient()

  const { isPending, mutateAsync: postMovimentFn } = useMutation({
    mutationKey: ["moviment-insert"],
    mutationFn: postMoviment,
    onSuccess: () => {
      reset({
        productId: "",
        type: action as any,
        quantity: 0
      })
      ToastProvider({ statusCode: 200 })

      queryClient.invalidateQueries({
        queryKey: ["history-topFive"],
      })
      queryClient.invalidateQueries({
        queryKey: ["history"],
      })
      queryClient.invalidateQueries({
        queryKey: ["product-report"],
      })
    },
    onError: (error: any) => {
      console.log(error)
      reset({
        productId: "",
        type: FormType.NONE,
        quantity: 0
      })
      ToastProvider({ statusCode: +error.response.status })
      throw error
    }
  })

  async function onAction(moviment: z.infer<typeof formSchema>) {
    try {
      await postMovimentFn(moviment)
    } catch (error) {
      console.error('Erro durante a mutação:', error);
    }
  }

  return (
    <Form.Root
      className="rounded-lg flex flex-col gap-8 p-6"
      onSubmit={handleSubmit(onAction)}
    >
      <p className="text-center text-lg">Cadastrar uma {
        action === "1" ? (
          <span className="text-vm-800 dark:text-vm-200">Entrada</span>) 
        : (<span className="text-red-300">Saída</span>)}
      </p>
      <Form.Label className="flex flex-col gap-1">
        <span className="dark:text-vm-100 font-poppins text-vm-900">Produto</span>
        <div>
          <Controller
            control={control}
            name="productId"
            render={({ field }) => (
              <SelectProducts value={field.value} onChange={field.onChange} />
            )}
          />
          {
            errors?.productId && (
              <span className="font-poppins text-sm text text-red-300">{errors.productId.message }</span>
            )
          }
        </div>
      </Form.Label>
      <Form.Label className="flex flex-col gap-1">
        <span className="dark:text-vm-100 font-poppins text-vm-900">Quantidade</span>
        <div>
          <Form.Field
            type="number"
            { ...register("quantity") }
            placeholder="0" 
          />
          {
            errors?.quantity && (
              <span className="font-poppins text-sm text text-red-300">{errors.quantity.message }</span>
            )
          }
        </div>
      </Form.Label>
      <Form.Trigger>
        <Button type="submit" variant="outline" className="w-full py-6 font-poppins text-lg flex gap-2">
          <FiSave className=" text-vm-200 dark:text-vm-900" />
          {
            isPending ? <Spin /> : "Salvar"
          }
        </Button>
      </Form.Trigger>
    </Form.Root>
  )
}