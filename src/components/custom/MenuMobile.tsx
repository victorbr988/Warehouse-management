"use client"

import { Dropdown } from "./Dropdown";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { FiLogOut, FiMenu, FiUser, FiYoutube } from "react-icons/fi";
import { ThemeSwitch } from "./ThemeSwitch";
import { useTheme } from "next-themes";
import Link from "next/link";

export function MenuMobile() {
  const { setTheme, resolvedTheme } = useTheme();

  function handleTheme() {
    if (resolvedTheme === "dark") {
      setTheme("light")
      return;
    }

    setTheme("dark")
  }

  return (
    <div className="sm:hidden">
      <Dropdown 
        className="dark:bg-vm-900 bg-vm-100 font-poppins border border-vm-200 dark:border-vm-800 ml-4"
        Icon={ FiMenu }
      >
        <DropdownMenuLabel className="font-medium">Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-vm-800 bg-vm-200" />
        <DropdownMenuItem className="dark:text-vm-200 text-vm-800 flex gap-2 items-center">
          <FiUser className="w-4 h-4" />
          <span className="flex-1">Meu perfil</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleTheme()} 
          className="dark:text-vm-200 text-vm-800 flex gap-2 items-center"
        >
          <ThemeSwitch iconClasses="h-4 w-4" />
          <span
           
          >
            Alterar tema
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="dark:bg-vm-800 bg-vm-200" />

        <DropdownMenuLabel>Navegar</DropdownMenuLabel>
        <DropdownMenuItem className="dark:text-vm-200 text-vm-800 flex gap-2 items-center">
          <FiYoutube />
          <Link 
            className="flex-1" 
            href="/videos"
          >
            Videos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="dark:bg-vm-800 bg-vm-200" />
        
        <DropdownMenuItem>
          <Link
            href="/"
            className="text-red-300 flex gap-2 items-center flex-1"
          >
            <FiLogOut className="h-4 w-4" />
            <span>Encerrar sessão</span>
          </Link>
          
        </DropdownMenuItem>
      </Dropdown>
    </div>
  )
}