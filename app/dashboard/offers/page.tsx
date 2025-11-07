"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { OffersTable } from "@/components/offers/offers-table"
import { AddOfferDialog } from "@/components/offers/add-offer-dialog"

export default function OffersPage() {
  const [offers, setOffers] = useState([
    { id: 1, title: "Premium Package", amount: 999, status: "active", createdAt: "2025-01-15" },
    { id: 2, title: "Starter Bundle", amount: 499, status: "active", createdAt: "2025-01-14" },
    { id: 3, title: "Enterprise Deal", amount: 2999, status: "paused", createdAt: "2025-01-10" },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddOffer = (newOffer: Omit<(typeof offers)[0], "id" | "createdAt">) => {
    const offer = {
      id: Math.max(...offers.map((o) => o.id), 0) + 1,
      ...newOffer,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setOffers([...offers, offer])
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Offers</h2>
          <p className="text-muted-foreground mt-1">Manage and track all your offers</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Offer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <OffersTable offers={offers} />
        </CardContent>
      </Card>

      <AddOfferDialog open={dialogOpen} onOpenChange={setDialogOpen} onAddOffer={handleAddOffer} />
    </div>
  )
}
