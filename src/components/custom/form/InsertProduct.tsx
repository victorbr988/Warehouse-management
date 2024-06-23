import { FiSave } from "react-icons/fi";
import { Form } from "@/components/Form";
import { Button } from "../../ui/button";
import { z } from "zod";
import { useInserProduct } from "@/hooks/form/insertProduct";
import { useMutation } from "@tanstack/react-query";
import { postProduct } from "@/requests/postProduct";
import { ToastProvider } from "@/providers/ToastProvider";
import { Spin } from "../Spin";

export function InsertProduct() {
  const {  handleSubmit, errors, reset, formSchema, register } = useInserProduct()

  const { isPending, mutateAsync: postProductFn } = useMutation({
    mutationKey: ["product-insert"],
    mutationFn: postProduct,
    onSuccess: () => {
      reset({
        name: "",
        quantity: 0
      })
      ToastProvider({ statusCode: 200 })
    },
    onError: (error: any) => {
      console.log(error)
      reset({
        name: "",
        quantity: 0
      })
      ToastProvider({ statusCode: +error.response.status })
      throw error
    }
  })

  async function onAction(moviment: z.infer<typeof formSchema>) {
    try {
      await postProductFn(moviment)
    } catch (error) {
      console.error('Erro durante a mutação:', error);
    }
  }

  return (
    <Form.Root
      className="rounded-lg flex flex-col gap-8 p-6"
      onSubmit={handleSubmit(onAction)}
    >
      <Form.Label className="flex flex-col gap-1">
        <span className="dark:text-vm-100 font-poppins text-vm-900">Nome do produto</span>
        <div>
          <Form.Field
            type="text"
            { ...register("name") }
            placeholder="Kit de cerâmicas"
          />
          {
            errors?.name && (
              <span className="font-poppins text-sm text text-red-300">{errors.name.message }</span>
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