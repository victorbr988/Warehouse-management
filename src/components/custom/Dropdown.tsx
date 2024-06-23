"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconType } from "react-icons/lib"
import { cn } from "@/lib/utils"

interface IDropdownProps {
  children : ReactNode;
  Icon: IconType;
  className?: string;
}
export function Dropdown({ children, Icon, className }: IDropdownProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Icon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("w-56", className)}>
        { children }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
