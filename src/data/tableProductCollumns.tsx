import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiArrowDownCircle, FiArrowUpCircle, FiClipboard } from "react-icons/fi"
import { format } from "date-fns"
import { FormType } from "@/lib/zustand"
import { Fragment } from "react"
import Link from "next/link"

export type history = {
  id: string;
  type: string
  product?: string;
  productId?: string;
  quantity?: number;
  datetime: Date;
}

export const productCollumns: ColumnDef<history>[] = [
  { 
    accessorKey: "id",
    meta: { 
      isVisible: false
    },
    header: "Id", cell: ({ row }) => row.getValue("id") 
  },
  { 
    accessorKey: "productId",
    meta: { 
      isVisible: false
    },
    header: "productId", cell: ({ row }) => row.getValue("productId")
  },
  {
    accessorKey: "type",
    header: () => <div className="text-left min-w-40">Tipo</div>,
    cell: ({ row }) => {
      return row.getValue("type") === FormType.ENTRANCE 
      ? (
        <span className="text-vm-800 dark:text-vm-200 flex gap-2 items-center">
          Entrada
          <FiArrowUpCircle className="h-4 w-4" />
        </span>
      ) : (
        <span className="text-red-300 flex gap-2 items-center">
          Saída
          <FiArrowDownCircle className="h-4 w-4" />
        </span>
      )
    }
  },
  {
    accessorKey: "product",
    header: "Produto",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "datetime",
    header: "Data e Hora",
    cell: ({ row }) => {
      return format(new Date(row.getValue("datetime")), "dd/MM/yyyy HH:mm")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Fragment>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-vm-900 gap-1 flex flex-col bg-vm-100 font-poppins border border-vm-200 dark:border-vm-800 ml-4">
              <DropdownMenuLabel className="font-medium">Ações</DropdownMenuLabel>
              <DropdownMenuItem 
                className="hover:dark:bg-vm-800 hover:dark:-none hover:bg-vm-200/30 cursor-pointer dark:text-vm-200 text-vm-800"
              >
                <Link 
                  href={`/report/${row.getValue("productId")}`}
                  className="flex-1 flex gap-2 items-center"
                >
                  <FiClipboard className="w-4 h-4" />
                  <span className="flex-1">Relatório</span>
                </Link>
              </DropdownMenuItem>      
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      )
    },
  },
]