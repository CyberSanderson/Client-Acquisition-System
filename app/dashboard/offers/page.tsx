"use client"

import { useState, useEffect } from "react"
import { supabaseBrowser } from "@/lib/supabaseBrowser"
import { AddOfferDialog } from "@/components/offers/add-offer-dialog"
import { OffersTable } from "@/components/offers/offers-table"
import { Button } from "@/components/ui/button"

export default function OffersPage() {
  const supabase = supabaseBrowser()
  const [offers, setOffers] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const fetchOffers = async () => {
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setOffers(data)
  }

  // Load offers on mount
  useEffect(() => {
    fetchOffers()
  }, [])

  // Called after a new offer is added
  const handleOfferAdded = () => {
    fetchOffers()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Offers</h1>
        <Button onClick={() => setOpen(true)}>New Offer</Button>
      </div>

      <OffersTable offers={offers} />

      <AddOfferDialog
        open={open}
        onOpenChange={setOpen}
        onOfferAdded={handleOfferAdded}
      />
    </div>
  )
}
