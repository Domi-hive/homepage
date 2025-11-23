"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderOpen, ShoppingBag, Menu, X, User, Bell } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import NotificationCenter from "@/components/agent/notification-center"
import ProfileMenu from "@/components/agent/profile-menu"

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const navItems = [
    {
      name: "Dashboard",
      href: "/agent/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Client Requests",
      href: "/agent/client-requests",
      icon: FolderOpen,
    },
    {
      name: "Listing Marketplace",
      href: "/agent/marketplace",
      icon: ShoppingBag,
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg p-2 hover:bg-muted md:hidden"
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600" />
            <span className="font-semibold text-sidebar-foreground">DomiHive</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-sidebar-primary/20 text-sidebar-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border space-y-3 px-4 py-4">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="rounded-lg p-2 hover:bg-sidebar-accent transition-colors"
                  aria-label="Agent profile"
                >
                  <User className="h-5 w-5" />
                </button>
                {showProfile && <ProfileMenu onClose={() => setShowProfile(false)} />}
              </div>
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="rounded-lg p-2 hover:bg-sidebar-accent transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                </button>
              </div>
            </div>
            {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
            <div className="rounded-lg bg-sidebar-accent p-4">
              <p className="text-sm font-medium text-sidebar-foreground">Welcome back!</p>
              <p className="text-xs text-sidebar-foreground/70 mt-1">You have 5 new requests</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:ml-0">{children}</main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
