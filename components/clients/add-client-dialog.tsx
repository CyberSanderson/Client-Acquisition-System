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
  DialogFooter,
} from '@/components/ui/dialog'

interface AddClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClientAdded: () => void // 🔁 to refresh the clients list
}

export function AddClientDialog({ open, onOpenChange, onClientAdded }: AddClientDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)

  const supabase = supabaseBrowser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      // 1️⃣ Get logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        console.error('❌ Error getting user:', userError)
        alert('Could not verify user. Please log in again.')
        return
      }

      if (!user) {
        alert('You must be logged in to add clients.')
        return
      }

      // 2️⃣ Get plan from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('❌ Error loading profile:', profileError)
        alert('Could not load your subscription plan.')
        return
      }

      const plan = profile?.plan ?? 'starter'

      // 3️⃣ Count existing clients for this user
      const { count, error: countError } = await supabase
        .from('clients')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)

      if (countError) {
        console.error('❌ Error counting clients:', countError)
        alert('Could not verify your client limit.')
        return
      }

      const currentCount = count ?? 0

      // 4️⃣ Enforce Starter limit (500 clients)
      if (plan === 'starter' && currentCount >= 500) {
        alert(
          "You've reached your maximum of 500 clients on the Starter plan. " +
            'Upgrade to Pro or Agency to add more clients.'
        )
        return
      }

      // 5️⃣ Insert new client (⚠️ update fields to match your clients table)
      const { error: insertError } = await supabase.from('clients').insert([
        {
          user_id: user.id, // must exist as a column in clients table
          // ⬇️ CHANGE THESE to match your actual DB columns
          name: formData.name,
          email: formData.email,
        },
      ])

      if (insertError) {
        console.error('❌ Insert client error:', insertError)
        alert('Failed to create client. Check console for details.')
        return
      }

      console.log('✅ Client created successfully.')
      onClientAdded()
      onOpenChange(false)
      setFormData({ name: '', email: '' })
    } catch (err) {
      console.error('❌ Unexpected error adding client:', err)
      alert('Something went wrong while adding the client.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Jane Smith"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Client Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g., jane@example.com"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Client'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
