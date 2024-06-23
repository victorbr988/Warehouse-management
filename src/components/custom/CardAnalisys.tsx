import { cn, quantityFormatter } from "@/lib/utils";

interface ICardAnalisysProps {
  className?: string;
  group?: string;
  quantity?: string;
}

export function CardAnalisys({ className, group, quantity = "0" }: ICardAnalisysProps) { 
  return (
    <div className={cn("flex flex-col gap-3)", className)}>
      {group && <h2 className="text-lg font-poppins text-vm-800 dark:text-vm-200">{group}</h2>}
      <div className="flex min-w-36 justify-center items-center rounded-lg border border-vm-200 dark:border-vm-800 p-4 sm:p-6 dark:bg-vm-900 bg-vm-100">
        <span>{quantityFormatter(+quantity)}</span>
      </div>
    </div>
  )
}