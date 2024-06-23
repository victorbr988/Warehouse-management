import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"

interface IProviderProps {
  statusCode?: number
}

export function ToastProvider({ statusCode = 0 }: IProviderProps) {
  switch (statusCode) {
    case 200:
      return (
        toast({
          title: "Sucesso na requisição",
          description: "SemeaTech",
          action: (
            <ToastAction altText="Confirmar">Ok</ToastAction>
          )
        })
      )
    case 201:
      return (
        toast({
          title: "Sessão iniciada com sucesso",
          description: "SemeaTech",
          action: (
            <ToastAction altText="Confirmar">Ok</ToastAction>
          )
        })
      )
    case 401:
    case 404:
      return (
        toast({
          title: "Não foi possível realizar a operação",
          description: "Verifique os dados",
          action: (
            <ToastAction altText="Confirmar">Ok</ToastAction>
          )
        })
      )
    default:
      return (
        toast({
          title: "Não foi possível realizar a operação",
          description: "Código de erro: " + statusCode,
          action: (
            <ToastAction altText="Confirmar">Ok</ToastAction>
          )
        })
      )
  }
}