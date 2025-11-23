"use client"

import { useState } from "react"
import { Bell, MapPin, Filter, X } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  location: string
  timestamp: string
  read: boolean
  type: "referral" | "request" | "inspection"
}

interface NotificationCenterProps {
  onClose: () => void
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New referral request",
    description: "Sarah Johnson used your Downtown Loft in a response",
    location: "Downtown District",
    timestamp: "2 hours ago",
    read: false,
    type: "referral",
  },
  {
    id: "2",
    title: "Inspection scheduled",
    description: "Client inspecting your property tomorrow at 2 PM",
    location: "Riverside Area",
    timestamp: "5 hours ago",
    read: false,
    type: "inspection",
  },
  {
    id: "3",
    title: "New client request",
    description: "Matching client looking for 3-4 bed properties",
    location: "Tech Park District",
    timestamp: "1 day ago",
    read: true,
    type: "request",
  },
]

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const [filterLocation, setFilterLocation] = useState<string | null>(null)

  const filteredNotifications = filterLocation
    ? notifications.filter((n) => n.location === filterLocation)
    : notifications

  const unreadCount = notifications.filter((n) => !n.read).length
  const locations = Array.from(new Set(notifications.map((n) => n.location)))

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="absolute bottom-full right-0 mb-2 w-96 rounded-lg border border-border bg-card shadow-lg overflow-hidden dark:bg-slate-800 dark:border-slate-700 max-h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-slate-700 bg-muted">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <h3 className="font-semibold text-foreground">Notifications {unreadCount > 0 && `(${unreadCount})`}</h3>
        </div>
        <button onClick={onClose} className="rounded p-1 hover:bg-background">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Location Filter */}
      <div className="px-4 py-2 border-b border-border dark:border-slate-700 bg-background">
        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">Filter by location:</span>
        </div>
        <div className="flex gap-1 flex-wrap mt-2">
          <button
            onClick={() => setFilterLocation(null)}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              filterLocation === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setFilterLocation(location)}
              className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                filterLocation === location
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <MapPin className="h-3 w-3" />
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`w-full px-4 py-3 border-b border-border dark:border-slate-700 text-left transition-colors hover:bg-muted ${
                !notification.read ? "bg-blue-50 dark:bg-blue-950/20" : ""
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === "referral"
                      ? "bg-green-500"
                      : notification.type === "inspection"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {notification.location} • {notification.timestamp}
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <p className="text-sm">No notifications for this filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
