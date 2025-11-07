"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

const offers = [
  {
    id: 1,
    name: "Premium Package",
    description: "Full access to all features",
    price: "$999/mo",
    status: "Active",
    conversions: 45,
  },
  {
    id: 2,
    name: "Starter Package",
    description: "Basic features and support",
    price: "$299/mo",
    status: "Active",
    conversions: 128,
  },
  {
    id: 3,
    name: "Enterprise Deal",
    description: "Custom solutions for large teams",
    price: "Custom",
    status: "Inactive",
    conversions: 12,
  },
]

export default function OffersPage() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "", price: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
    setFormData({ name: "", description: "", price: "" })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Offers</h1>
          <p className="text-muted-foreground mt-2">Create and manage your service offers</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
              <DialogDescription>Add a new offer to your portfolio</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Offer Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Premium Package"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What does this offer include?"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="e.g., $999/mo or Custom"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Offer</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Offers Grid */}
      <div className="grid gap-6">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>{offer.name}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-bold text-foreground">{offer.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`font-bold ${offer.status === "Active" ? "text-accent" : "text-muted-foreground"}`}>
                    {offer.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conversions</p>
                  <p className="font-bold text-foreground">{offer.conversions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
