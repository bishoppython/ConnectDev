"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal } from "lucide-react"
import type { ConnectionType } from "@/lib/types"

const CONNECTION_TYPES: { value: ConnectionType; label: string }[] = [
  { value: "friendship", label: "Amizade" },
  { value: "networking", label: "Networking" },
  { value: "dating", label: "Namoro" },
  { value: "business", label: "Negócios" },
  { value: "creative", label: "Criativo" },
  { value: "sports", label: "Esportes" },
  { value: "learning", label: "Aprendizado" },
]

interface FilterDialogProps {
  selectedTypes: ConnectionType[]
  onTypesChange: (types: ConnectionType[]) => void
}

export function FilterDialog({ selectedTypes, onTypesChange }: FilterDialogProps) {
  const [open, setOpen] = useState(false)
  const [tempSelected, setTempSelected] = useState<ConnectionType[]>(selectedTypes)

  const toggleType = (type: ConnectionType) => {
    setTempSelected((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleApply = () => {
    onTypesChange(tempSelected)
    setOpen(false)
  }

  const handleClear = () => {
    setTempSelected([])
    onTypesChange([])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <SlidersHorizontal className="h-5 w-5" />
          {selectedTypes.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
              {selectedTypes.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar por tipo de conexão</DialogTitle>
          <DialogDescription>Selecione os tipos de conexão que você está buscando</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {CONNECTION_TYPES.map((type) => (
              <Badge
                key={type.value}
                variant={tempSelected.includes(type.value) ? "default" : "outline"}
                className={`cursor-pointer ${
                  tempSelected.includes(type.value)
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600"
                    : ""
                }`}
                onClick={() => toggleType(type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClear} className="flex-1 bg-transparent">
              Limpar
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
