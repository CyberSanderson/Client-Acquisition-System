"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  status: "hot" | "warm" | "cold"
  source: string
  createdAt: string
}

interface LeadsTableProps {
  leads: Lead[]
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "warm":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "cold":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No leads found matching your criteria</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Phone</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Source</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Created</th>
            <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-4 text-foreground font-medium">{lead.name}</td>
              <td className="py-3 px-4 text-foreground text-sm">{lead.email}</td>
              <td className="py-3 px-4 text-foreground">{lead.phone}</td>
              <td className="py-3 px-4">
                <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
              </td>
              <td className="py-3 px-4 text-muted-foreground text-sm">{lead.source}</td>
              <td className="py-3 px-4 text-muted-foreground text-sm">{lead.createdAt}</td>
              <td className="py-3 px-4 text-right flex items-center justify-end gap-2">
                <Button size="icon" variant="ghost" title="View details">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" title="Edit lead">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10"
                  title="Delete lead"
                >
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
