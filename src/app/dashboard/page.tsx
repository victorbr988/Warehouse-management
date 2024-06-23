"use client"

import { Header } from "@/components/custom/Header";
import { DataTable } from "@/components/custom/TableProducts";
import { productCollumns } from "../../data/tableProductCollumns";
import { Container } from "@/components/custom/Container";
import { ButtonAdd } from "@/components/custom/ButtonAdd";
import { Footer } from "@/components/custom/Footer";
import { DialogForm } from "@/components/custom/Drawer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormType, useFormStore } from "@/lib/zustand";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/requests/getHistory";

export default function Dashboard() {
  const router = useRouter()
  const { action } = useFormStore()

  const { data: history = { data: [] } } = useQuery({
    queryKey: ["history-topFive"],
    queryFn: () => getHistory({ take: 5, skip: 0 }),
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return (
    <main className="flex flex-col gap-4 min-h-screen">
      <Header />

      <section className="flex flex-col justify-between flex-1">
        <div> 
          <Container className="sm:hidden flex">
            <ButtonAdd className="w-full flex justify-between py-6" />
          </Container>
    
          <Container className="flex font-poppins text-lg dark:text-vm-100 text-vm-800 flex-col gap-4">
            <section className="flex flex-wrap gap-4">
              <h2>5 Movimentações mais recentes</h2>
              <Button 
                onClick={() => router.push("/history")}
                variant="outline" 
                className=" py-4 font-poppins text-2md flex gap-2"
              >
                Ver histórico completo
              </Button>
            </section>
            <DataTable columns={productCollumns} data={history.data as any} />
          </Container>
        </div>
        <Footer />
      </section>
      {
        action && action !== FormType.NONE && (
          <DialogForm />
        )
      }
    </main>
  )
}