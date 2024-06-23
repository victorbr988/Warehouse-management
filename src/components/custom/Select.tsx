import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/requests/interfaces/getProducts"

interface ISelectProps {
  value?: string
  onChange: (value: string) => void
}

export function SelectProducts(props: ISelectProps) {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  return (
    <Select
      name="productId"
      value={props.value}
      onValueChange={props.onChange}
      { ...props }
    >
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Selecione um produto" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {products.map((product: Record<string, any>) => (
            <SelectItem key={product.id} value={product.id}>
              {product.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
