import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface IContainerParam extends HTMLAttributes<HTMLTableSectionElement> {}
export function Container(props: IContainerParam) {
  return (
    <section
      { ...props }
      className={cn("p-5", props.className)}
    >
      { props.children }
    </section>
  )
}