"use client"

import { useState } from "react"
import { User, LogOut } from "lucide-react"

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
      >
        <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
          <User className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        <div className="text-left flex-1">
          <p className="text-sm font-medium">Profile</p>
          <p className="text-xs opacity-75">client@domihive.com</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 right-0 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <button className="w-full px-4 py-2 text-left text-foreground hover:bg-muted transition-colors flex items-center gap-2 text-sm">
            <User className="w-4 h-4" />
            My Profile
          </button>
          <button className="w-full px-4 py-2 text-left text-destructive hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
