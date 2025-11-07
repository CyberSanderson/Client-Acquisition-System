"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface Offer {
  id: number
  title: string
  amount: number
  status: "active" | "paused" | "expired"
  createdAt: string
}

interface OffersTableProps {
  offers: Offer[]
}

export function OffersTable({ offers }: OffersTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Created</th>
            <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id} className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-4 text-foreground">{offer.title}</td>
              <td className="py-3 px-4 text-foreground font-medium">${offer.amount}</td>
              <td className="py-3 px-4">
                <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{offer.createdAt}</td>
              <td className="py-3 px-4 text-right flex items-center justify-end gap-2">
                <Button size="icon" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
