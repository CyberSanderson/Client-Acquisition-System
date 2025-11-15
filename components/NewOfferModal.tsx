'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function NewOfferModal({ onOfferAdded }: { onOfferAdded: () => void }) {
  const supabase = supabaseBrowser()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // ✅ Fetch the current logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        alert('User not found. Please log in again.')
        return
      }

      // ✅ Insert offer with user_id
      const { error } = await supabase.from('offers').insert([
        {
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          status: 'active',
          user_id: user.id, // ✅ critical line
        },
      ])

      if (error) {
        console.error('❌ Insert error:', error)
        alert('Failed to create offer.')
      } else {
        console.log('✅ Offer created successfully')
        setFormData({ title: '', description: '', price: '' })
        setOpen(false)
        onOfferAdded()
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err)
      alert('Something went wrong while saving your offer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add New Offer</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Offer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <div>
            <Label>Title</Label>
            <Input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <Label>Description</Label>
            <Input name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Save Offer'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
