"use client"

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes"

interface IProviderProps {
  children: ReactNode
}

export function NextThemeProvider({ children }: IProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
    >
      { children }
    </ThemeProvider>
  )
}