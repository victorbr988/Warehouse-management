"use client"

import { ButtonAdd } from "@/components/custom/ButtonAdd";
import { CardAnalisys } from "@/components/custom/CardAnalisys";
import { Container } from "@/components/custom/Container";
import { DialogForm } from "@/components/custom/Drawer";
import { Header } from "@/components/custom/Header";
import { Spin } from "@/components/custom/Spin";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { FormType, useFormStore } from "@/lib/zustand";
import { ToastProvider } from "@/providers/ToastProvider";
import { deleteProduct } from "@/requests/deleteProduct";
import { getProductReport } from "@/requests/getProductReport";
import { Toast, ToastAction } from "@radix-ui/react-toast";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

interface IReport {
  params: {
    slug: string;
  };
}

interface IDataWIthReport {
  id: string;
  name: string;
  total_entrance: string;
  total_exit: string;
  quantity: string;
}

export default function Report({ params: { slug } }: IReport) {
  const { action } = useFormStore()
  const router = useRouter()

  const { data: report }: UseQueryResult<IDataWIthReport> = useQuery({
    queryKey: ["product-report"],
    queryFn: () => getProductReport(slug),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const { isPending, mutateAsync: deleteProductFn } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      ToastProvider({ statusCode: 200 })
      router.push("/dashboard")
    },
    onError: (error: any) => {
      console.log(error)
      ToastProvider({ statusCode: +error.response.status })
      throw error
    }
  })

  async function onAction(event: any) {
    event.preventDefault()
    try {
      await deleteProductFn(report!.id)
    } catch (error) {
      console.error('Erro durante a mutação:', error);
    }
  }
  
  return (
    <main className="flex flex-col gap-4 min-h-screen">
      <Header />
      <Container>
        <p 
          className="flex max-w-36 gap-3 font-poppins dark:text-vm-200 text-vm-800 cursor-pointer" 
          onClick={() => router.back()}
        >
          <FiArrowLeft className="h-6 w-6 cursor-pointer " onClick={() => router.back()} />
          Voltar
        </p>
      </Container>
      <Container className="flex flex-col flex-1">
        <section className="flex items-center justify-between gap-4">
          <h2 className="pb-8 dark:text-vm-200 text-vm-800 text-2xl">{report?.name ?? "Produto não encontrado"}</h2>
          <h2 className="pb-8 dark:text-vm-200 text-vm-800 text-lg">Últimos 30 dias</h2>
        </section>
        
        <div>
          <Container className="sm:hidden flex">
            <ButtonAdd className="w-full flex justify-between py-6" />
          </Container>
        </div>
        <section className="flex gap-8">
          <CardAnalisys quantity={report?.total_entrance} group="Entradas" />
          <CardAnalisys quantity={report?.total_exit} group="Saídas" />
          <CardAnalisys quantity={report?.quantity} group="Quantidade em estoque" />
        </section>

        <div className="py-8">
          <Dialog>
            <DialogTrigger> 
              <Button
                variant="destructive"
                className="flex gap-2 items-center"
              >
                <FiTrash2 className="h-4 w-4" />
                Excluir Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-vm-100 dark:bg-vm-900 dark:border-vm-800 border-vm-200 p-8">
              <h2 className="text-center">Ao excluir um produto, todo o histórico de entradas e saídas também serão excluídas PERMANENTEMENTE!</h2>
              <p className="dark:text-vm-200 text-vm-800">Tem certeza que deseja excluir este produto?</p>
              <DialogClose>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={onAction}
                  className="flex gap-2 items-center py-5 w-full"
                >
                  { isPending ? <Spin /> : (
                  <Fragment>
                    <FiTrash2 className="h-4 w-4" />
                    Sim, excluir este produto
                  </Fragment>
                )}
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
      {
        action && action !== FormType.NONE && (
          <DialogForm />
        )
      }
    </main>
  )
}