import { InsertMovimentForm } from "@/components/custom/form/InsertMovimentForm";
import { InsertProduct } from "@/components/custom/form/InsertProduct";
import { FormType, useFormStore } from "@/lib/zustand"

export function FormProvider() {
  const { action } = useFormStore()

  switch (action || FormType.NONE) {
    case FormType.ENTRANCE:
    case FormType.EXIT:
      return <InsertMovimentForm />
    case FormType.PRODUCT:
      return <InsertProduct />  
  }
}