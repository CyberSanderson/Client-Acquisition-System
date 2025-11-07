"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Lock, Bell, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    company: "Acme Corporation",
    phone: "+1 (555) 123-4567",
  })

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    leadAlerts: true,
    weeklyReport: true,
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleProfileSave = () => {
    console.log("Profile saved:", profile)
    alert("Profile updated successfully!")
  }

  const handlePasswordChange = () => {
    if (password.new !== password.confirm) {
      alert("Passwords don't match!")
      return
    }
    console.log("Password changed")
    alert("Password updated successfully!")
    setPassword({ current: "", new: "", confirm: "" })
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => handleProfileChange("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => handleProfileChange("company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={handleProfileSave} className="w-full">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input
                  id="current"
                  type="password"
                  placeholder="••••••••"
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input
                  id="new"
                  type="password"
                  placeholder="••••••••"
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                />
              </div>
              <Button onClick={handlePasswordChange} className="w-full">
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="gap-2 w-full">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailNotifications}
                  onChange={() => handleNotificationToggle("emailNotifications")}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Lead Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when new leads are added</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.leadAlerts}
                  onChange={() => handleNotificationToggle("leadAlerts")}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Weekly Report</p>
                  <p className="text-sm text-muted-foreground">Receive a weekly summary of your activity</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.weeklyReport}
                  onChange={() => handleNotificationToggle("weeklyReport")}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <Button className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
