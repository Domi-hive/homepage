"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderOpen, ShoppingBag, Menu, X, LogOut, Bell, MessageSquare, Eye } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    {
      label: "Dashboard",
      href: "/agent/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Listings",
      href: "/agent/my-listings",
      icon: FolderOpen,
    },
    {
      label: "Client Requests",
      href: "/agent/client-requests",
      icon: FolderOpen,
    },

    {
      label: "Inspections",
      href: "/agent/inspections",
      icon: Eye,
    },
    {
      label: "Listing Marketplace",
      href: "/agent/marketplace",
      icon: ShoppingBag,
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            {/* Show Logo only if no specific page title match or if sidebar is open (though sidebar covers this) */}
            {/* Actually user wants Title to replace Logo when menu is closed. */}
            {(() => {
              const getTitle = () => {
                if (pathname === '/agent/dashboard') return 'Dashboard'
                if (pathname === '/agent/client-requests') return 'Client Requests'
                if (pathname === '/agent/marketplace') return 'Listings Marketplace'
                // Check for sub-routes if necessary, or default
                if (pathname?.startsWith('/agent/client-requests/')) return 'Response'
                return null
              }
              const title = getTitle()

              if (title) {
                return <span className="font-bold text-slate-800 text-xl">{title}</span>
              }

              return (
                <>
                  <img src="/landing/logo.png" alt="DomiHive" className="w-8 h-8" />
                  <span className="font-bold text-slate-800 text-lg">DomiHive</span>
                </>
              )
            })()}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/agent/activity" className="text-slate-600 hover:text-slate-900 transition-colors" aria-label="Notifications">
            <Bell className="w-5 h-5" />
          </Link>
          <ThemeToggle />
          <Link href="/agent/profile">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              <span>JD</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          flex flex-col 
          w-64 md:w-20 md:hover:w-64 
          bg-sidebar border-r border-sidebar-border 
          transition-all duration-300 ease-in-out 
          group overflow-hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Area */}
        <div className="h-16 md:h-auto p-6 border-b border-sidebar-border flex items-center justify-between md:justify-start gap-3 whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-3">
            <img src="/landing/logo.png" alt="DomiHive" className="w-8 h-8 flex-shrink-0" />
            <h1 className="text-xl font-bold text-sidebar-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">DomiHive</h1>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto dark:bg-black/20">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 md:py-2 rounded-lg transition-colors whitespace-nowrap overflow-hidden ${isActive(item.href)
                  ? "bg-sidebar-primary/20 text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <button
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors whitespace-nowrap overflow-hidden"
            aria-label="Log out"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden pt-16 md:pt-0">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
