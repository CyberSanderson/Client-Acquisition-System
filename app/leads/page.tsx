"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

const leads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    company: "Tech Solutions Inc",
    status: "Qualified",
    date: "2025-01-05",
    value: "$5,000",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    company: "Digital Agency Co",
    status: "Contacted",
    date: "2025-01-04",
    value: "$3,500",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    company: "Creative Studio",
    status: "New",
    date: "2025-01-03",
    value: "$2,200",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james@example.com",
    company: "Marketing Group",
    status: "Qualified",
    date: "2025-01-02",
    value: "$6,800",
  },
  {
    id: 5,
    name: "Lisa Brown",
    email: "lisa@example.com",
    company: "Business Solutions",
    status: "Contacted",
    date: "2025-01-01",
    value: "$4,100",
  },
]

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Qualified: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-2">Manage all your leads in one place</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>Track and manage your sales pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Lead Value</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Added</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground">{lead.name}</td>
                    <td className="py-3 px-4 text-foreground">{lead.company}</td>
                    <td className="py-3 px-4 text-muted-foreground text-sm">{lead.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                    </td>
                    <td className="py-3 px-4 font-semibold text-accent">{lead.value}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{lead.date}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="ghost" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
