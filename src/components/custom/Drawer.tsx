import React from "react"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { FormProvider } from "@/providers/FormProvider";

export function DialogForm() {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px] bg-vm-100 dark:bg-vm-900 dark:border-vm-800 border-vm-200">
        <FormProvider />
      </DialogContent>
    </Dialog>
  )
}
