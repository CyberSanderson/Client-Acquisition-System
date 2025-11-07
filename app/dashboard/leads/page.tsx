"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { LeadsTable } from "@/components/leads/leads-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LeadsPage() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "555-1234",
      status: "hot",
      source: "Website",
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "555-5678",
      status: "warm",
      source: "Referral",
      createdAt: "2025-01-14",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@example.com",
      phone: "555-9012",
      status: "cold",
      source: "Email",
      createdAt: "2025-01-13",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "555-3456",
      status: "hot",
      source: "Website",
      createdAt: "2025-01-12",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert@example.com",
      phone: "555-7890",
      status: "warm",
      source: "Social Media",
      createdAt: "2025-01-11",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Leads</h2>
        <p className="text-muted-foreground mt-1">Manage and track all your leads</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Database</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>

          {/* Table */}
          <LeadsTable leads={filteredLeads} />
        </CardContent>
      </Card>
    </div>
  )
}
