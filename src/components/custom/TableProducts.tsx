import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  pagination?: boolean
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
  pagination = false
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        id: false,
        productId: false,
      }
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      }
    }
  });
 
  return (
    <div>
      <div className="rounded-md border dark:border-vm-800 border-vm-200">
        <Table>
          <TableHeader className="text-2md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center font-poppins">
                  Sem resultados na busca
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={
        cn("flex items-center justify-between space-x-2 py-4", {
          "hidden": !pagination
        })
      }>
        <div>
         {' '}
          <p className="text-sm font-poppins text-vm-800 dark:text-vm-200">
            {`Página ${table.getState().pagination.pageIndex + 1} de ${table.getPageCount()}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="border disabled:border-vm-800 border-vm-200"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="ghost"
            className="border disabled:border-vm-800 border-vm-200"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
        
      </div>
    </div>
  )
}