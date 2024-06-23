import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Button } from "../ui/button";
import { FormType, useFormStore } from "@/lib/zustand";
import { cn } from "@/lib/utils";

interface IButtonAddProps {
  className?: string;
}

export function ButtonAdd({ className }: IButtonAddProps) {
  const { setModal } = useFormStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("text-md flex gap-2", className)}
          variant="outline"
        >
          <span className="text-md">Adicionar</span>
          <FiChevronDown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-vm-900 gap-1 flex flex-col bg-vm-100 font-poppins border border-vm-200 dark:border-vm-800">
        <DropdownMenuItem
          onClick={() => setModal(FormType.ENTRANCE)}
          className="hover:dark:bg-vm-800 hover:dark:-none hover:bg-vm-200/30 cursor-pointer dark:text-vm-200 text-vm-800"
        >
          <span className="flex-1">Entrada</span>
        </DropdownMenuItem>
       
        <DropdownMenuItem
          onClick={() => setModal(FormType.EXIT)}
          className="hover:dark:bg-vm-800 hover:dark:-none hover:bg-vm-200/30 cursor-pointer dark:text-vm-200 text-vm-800"
        >
        <span className="flex-1">Saída</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setModal(FormType.PRODUCT)}
          className="hover:dark:bg-vm-800 hover:dark:-none hover:bg-vm-200/30 cursor-pointer dark:text-vm-200 text-vm-800"
        >
        <span className="flex-1">Produto</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}