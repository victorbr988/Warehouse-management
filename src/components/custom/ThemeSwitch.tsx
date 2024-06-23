"use client"

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type IThemeOptions = "light" | "dark"
interface IThemeSwitchProps {
  iconClasses?: string;
}
export function ThemeSwitch({ iconClasses }: IThemeSwitchProps) {
  const [mounted, setMounted] = useState<boolean>(false)
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <FiSun 
        className={cn("iconTheme", iconClasses)}
        name="ligth"
        onClick={() => handleTheme("light")} 
      /> 
    )
  }

  function handleTheme(theme: IThemeOptions) {
    setTheme(theme)
  }

  return (
    <Fragment>
      { resolvedTheme === "dark" && (
        <FiSun 
          className={cn("iconTheme", iconClasses)}
          name="ligth"
          onClick={() => handleTheme("light")} 
        /> 
      )}
      { resolvedTheme === "light" && (
        <FiMoon
          className={cn("iconTheme", iconClasses)}
          name="dark" 
          onClick={() => handleTheme("dark")}
        />
      )}
    </Fragment>
  )
}