"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderOpen, Menu, X, LogOut } from "lucide-react"
import { useState } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/client/requests", label: "Requests", icon: FolderOpen },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col w-64 md:w-20 md:hover:w-64 transition-all duration-300 ease-in-out bg-sidebar border-r border-sidebar-border group overflow-hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border flex items-center gap-3 whitespace-nowrap overflow-hidden">
          <img src="/landing/logo.png" alt="DomiHive" className="w-8 h-8 flex-shrink-0" />
          <h1 className="text-xl font-bold text-sidebar-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">DomiHive</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors whitespace-nowrap overflow-hidden ${isActive(item.href)
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

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-sidebar border border-sidebar-border"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
