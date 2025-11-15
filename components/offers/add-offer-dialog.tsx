'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

interface AddOfferDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOfferAdded: () => void
}

export function AddOfferDialog({ open, onOpenChange, onOfferAdded }: AddOfferDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    status: 'active' as 'active' | 'paused' | 'expired',
  })
  const [loading, setLoading] = useState(false)

  const supabase = supabaseBrowser() // ✅ correct browser client

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.amount) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      // ✅ Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        alert('You must be logged in to create offers.')
        return
      }

      // ✅ Insert into correct column names
      const { error } = await supabase.from('offers').insert([
        {
          user_id: user.id,
          title: formData.title,
          price: parseFloat(formData.amount), // <— matches DB column
          status: formData.status,
        },
      ])

      if (error) {
        console.error('❌ Insert error:', error)
        alert('Failed to create offer. Check console for details.')
        return
      }

      console.log('✅ Offer created successfully!')
      onOfferAdded()
      onOpenChange(false)

      // Reset form
      setFormData({ title: '', amount: '', status: 'active' })
    } catch (err) {
      console.error('❌ Unexpected insert error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Offer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Offer Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Premium Package"
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="e.g., 999"
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Offer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

