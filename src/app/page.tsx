"use client"
import { Footer } from "@/components/custom/Footer";
import { LoginForm } from "@/components/custom/form/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col justify-around items-center">
      <section>
        <div className="flex flex-col gap-2 pb-4 items-center">
          <h1 className="font-jetbrains text-3xl font-semibold text-violet-500">SemeaTech</h1>
          <p className="font-jetbrains dark:text-vm-100 text-vm-900 text-xl">Controlando seu estoque</p>
        </div>
        <LoginForm />
      </section>
      <Footer />
    </main>
  )
}
