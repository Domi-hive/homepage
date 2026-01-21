"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FolderOpen, Menu, X, LogOut, Eye, Bell, MessageSquare } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/ui/Logo"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/client/requests", label: "Requests", icon: FolderOpen },

    { href: "/client/inspections", label: "Inspections", icon: Eye },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            {/* Show Logo only if no specific page title match or if sidebar is open (though sidebar covers this) */}
            {(() => {
              const getTitle = () => {
                if (pathname === '/client/dashboard') return 'Dashboard'
                if (pathname === '/client/requests') return 'Requests'
                if (pathname === '/client/inspections') return 'My Inspections'
                return null
              }
              const title = getTitle()

              if (title) {
                return <span className="font-bold text-slate-800 text-xl">{title}</span>
              }

              return (
                <>
                  <Logo />
                </>
              )
            })()}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/client/activity" className="text-slate-600 hover:text-slate-900 transition-colors" aria-label="Notifications">
            <Bell className="w-5 h-5" />
          </Link>
          <ThemeToggle />
          <Link href="/client/profile">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              <span>U</span>
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
          dark:bg-navy-900 dark:border-white/10 
          transition-all duration-300 ease-in-out 
          group overflow-hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Area */}
        <div className="h-16 md:h-auto p-6 border-b border-sidebar-border dark:border-white/10 flex items-center justify-between md:justify-start gap-3 whitespace-nowrap overflow-hidden text-navy-900 dark:text-white">
          <div className="flex items-center gap-3">
            <Logo
              color="auto"
              textClassName="md:w-0 md:opacity-0 md:group-hover:w-auto md:group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap"
            />
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 md:py-2 rounded-lg transition-colors whitespace-nowrap overflow-hidden ${isActive(item.href)
                  ? "bg-coral/10 text-coral dark:bg-coral dark:text-white dark:shadow-lg dark:shadow-coral/20 font-medium"
                  : "text-sidebar-foreground dark:text-slate-400 hover:bg-sidebar-accent dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border dark:border-white/10 p-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors whitespace-nowrap overflow-hidden group/logout"
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
