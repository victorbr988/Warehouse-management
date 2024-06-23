"use client"

import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { useLoginHookForm } from "@/hooks/form/login";
import { z } from "zod";
import { Fragment } from "react";
import { getSession } from "@/requests/session";
import { Spin } from "@/components/custom/Spin";
import { ToastProvider } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export function LoginForm() {
  const { register, formSchema, handleSubmit, errors, reset } = useLoginHookForm()
  const router = useRouter()

  const { isPending, mutateAsync: sessionMutation } = useMutation({
    mutationFn: getSession,
    onSuccess: () => {
      router.push("/dashboard")
      reset({
        email: "",
        password: ""
      })
      ToastProvider({ statusCode: 201 })
    },
    onError: (error: any) => {
      console.log(error)
      ToastProvider({ statusCode: +error.response.status })
      reset({
        email: "",
        password: ""
      })
      throw error
    }
  })

  async function onAction(userCredentials: z.infer<typeof formSchema>) {
    try {
      await sessionMutation({
        email: userCredentials.email,
        password: userCredentials.password,
      });
    } catch (error) {
      console.error('Erro durante a mutação:', error);
    }
  }

  return (
    <Fragment>
      <Form.Root
        className="border-[1px] dark:border-vm-800 border-vm-200 rounded-lg flex flex-col gap-8 p-6 md:w-postify-lg"
        onSubmit={handleSubmit(onAction)}
      >
        <Form.Label className="flex flex-col gap-1">
          <span className="dark:text-vm-100 font-jetbrains text-vm-900">Email</span>
          <div>
            <Form.Field
              type="email"
              { ... register("email") }
              placeholder="Seu email" 
              autoComplete="email"
            />
            {
              errors?.email && (
                <span className="font-jetbrains text-sm text text-red-300">{errors.email.message }</span>
              )
            }
          </div>
          
        </Form.Label>
        <Form.Label className="flex flex-col gap-1">
          <span className="dark:text-vm-100 text-vm-900 font-jetbrains">Senha</span>
          <div>
            <Form.Field
              type="password"
              { ... register("password") }
              placeholder="********"
              autoComplete="current-password"
            />
              {
              errors?.password && (
                <span className="font-jetbrains text-sm text text-red-300">{errors.password.message }</span>
              )
            }
          </div>
        </Form.Label>
        <Form.Trigger>
          <Button
            type="submit"
            className="font-jetbrains py-6 w-full text-lg"
            variant="outline"
          >
            {
              isPending ? <Spin /> : "Entrar"
            }
          </Button>
        </Form.Trigger>
      </Form.Root>
    </Fragment>
  )
}