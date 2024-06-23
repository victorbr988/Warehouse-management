"use client"

import { Header } from "@/components/custom/Header";
import { DataTable } from "@/components/custom/TableProducts";
import { productCollumns } from "../../data/tableProductCollumns";
import { Container } from "@/components/custom/Container";
import { ButtonAdd } from "@/components/custom/ButtonAdd";
import { Footer } from "@/components/custom/Footer";
import { DialogForm } from "@/components/custom/Drawer";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FormType, useFormStore } from "@/lib/zustand";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/requests/getHistory";
import { useState } from "react";

export default function History() {
  const router = useRouter()
  const { action } = useFormStore()
  const [query, _setQuery] = useState<Record<string, number>>({ take: 0, skip: 0 })

  const { data: history = { data: [] } } = useQuery({
    queryKey: ["history", { query }],
    queryFn: () => getHistory(query),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="flex flex-col justify-between flex-1">
        <div> 
          <Container>
            <p 
              className="flex max-w-36 gap-1 font-poppins dark:text-vm-200 text-vm-800 cursor-pointer" 
              onClick={() => router.back()}
            >
              <FiArrowLeft className="h-6 w-6 cursor-pointer " onClick={() => router.back()} />
              Dashboard
            </p>
          </Container>

          <Container className="sm:hidden flex">
            <ButtonAdd className="w-full flex justify-between py-6" />
          </Container>

          <Container className="flex font-poppins text-lg dark:text-vm-100 text-vm-800 flex-col gap-4">
            <section>
              <h2>Histórico de atividades</h2>
            </section>
            <DataTable pagination columns={productCollumns} data={history.data as any} />
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