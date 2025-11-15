'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

interface Offer {
  id: string
  title: string
  price: number
  status: 'active' | 'paused' | 'expired'
  created_at: string
  user_id?: string
}

export function OffersTable() {
  const supabase = supabaseBrowser()
  const [offers, setOffers] = useState<Offer[]>([])
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [loading, setLoading] = useState(false)

  // ✅ Fetch user offers
  const fetchOffers = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.warn('No user logged in.')
        return
      }

      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) console.error('❌ Error fetching offers:', error)
      else setOffers(data || [])
    } catch (err) {
      console.error('❌ Unexpected fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOffers()
  }, [])

  // 🗑️ Delete Offer
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) console.error('❌ Delete error:', error)
      else {
        console.log('✅ Offer deleted successfully')
        fetchOffers()
      }
    } catch (err) {
      console.error('❌ Unexpected delete error:', err)
    }
  }

  // ✏️ Save Edited Offer
  const handleEditSave = async () => {
    if (!editingOffer) return
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('offers')
        .update({
          title: editingOffer.title,
          price: editingOffer.price,
          status: editingOffer.status,
        })
        .eq('id', editingOffer.id)
        .eq('user_id', user?.id)

      if (error) console.error('❌ Update error:', error)
      else {
        console.log('✅ Offer updated successfully')
        setEditingOffer(null)
        fetchOffers()
      }
    } catch (err) {
      console.error('❌ Unexpected edit error:', err)
    }
  }

  // 🎨 Status color helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-foreground">My Offers</h2>

      {loading ? (
        <p className="text-muted-foreground">Loading offers...</p>
      ) : offers.length === 0 ? (
        <p className="text-muted-foreground">No offers yet. Create one to get started.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Created</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4 text-foreground">{offer.title}</td>
                <td className="py-3 px-4 text-foreground font-medium">${offer.price}</td>
                <td className="py-3 px-4">
                  <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {new Date(offer.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right flex items-center justify-end gap-2">
                  {/* ✏️ Edit */}
                  <Dialog
                    open={editingOffer?.id === offer.id}
                    onOpenChange={(open) => !open && setEditingOffer(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingOffer(offer)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>

                    {editingOffer && editingOffer.id === offer.id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Offer</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 mt-2">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={editingOffer.title}
                              onChange={(e) =>
                                setEditingOffer({ ...editingOffer, title: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label>Price</Label>
                            <Input
                              type="number"
                              value={editingOffer.price}
                              onChange={(e) =>
                                setEditingOffer({
                                  ...editingOffer,
                                  price: Number(e.target.value),
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Input
                              value={editingOffer.status}
                              onChange={(e) =>
                                setEditingOffer({
                                  ...editingOffer,
                                  status: e.target.value as Offer['status'],
                                })
                              }
                            />
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleEditSave}>Save</Button>
                          </div>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>

                  {/* 🗑️ Delete */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(offer.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
