"use client"

import { useState } from "react"
import { LogOut, Settings } from "lucide-react"

interface ProfileMenuProps {
  onClose: () => void
}

export default function ProfileMenu({ onClose }: ProfileMenuProps) {
  const [referralsEnabled, setReferralsEnabled] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleToggleReferrals = (enabled: boolean) => {
    if (!enabled && referralsEnabled) {
      setShowConfirm(true)
    } else {
      setReferralsEnabled(enabled)
    }
  }

  const confirmDisable = () => {
    setReferralsEnabled(false)
    setShowConfirm(false)
  }

  return (
    <div className="absolute bottom-full right-0 mb-2 w-80 rounded-lg border border-border bg-card shadow-lg p-4 dark:bg-slate-800 dark:border-slate-700">
      {/* Profile Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border dark:border-slate-700">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
          JD
        </div>
        <div>
          <p className="font-semibold text-foreground">John Doe</p>
          <p className="text-sm text-muted-foreground">Premium Agent</p>
        </div>
      </div>

      {/* Referral Toggle Section */}
      <div className="mb-4 pb-4 border-b border-border dark:border-slate-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="font-medium text-foreground mb-1">Allow other agents to refer my properties</p>
            <p className="text-xs text-muted-foreground">Enable referrals to earn 40% of inspection fees</p>
          </div>
          <button
            onClick={() => handleToggleReferrals(!referralsEnabled)}
            className={`ml-2 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              referralsEnabled ? "bg-green-500" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                referralsEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {referralsEnabled && (
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-3 flex gap-2">
            <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">ℹ️</div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              When enabled, other agents can include your properties in their responses to clients. You'll earn 40% of
              the inspection fee for referred properties.
            </p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-foreground">
          <Settings className="h-4 w-4" />
          <span className="text-sm">Account Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-destructive">
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Logout</span>
        </button>
      </div>

      {/* Disable Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowConfirm(false)} />
          <div className="relative rounded-lg border border-border bg-card shadow-lg p-6 dark:bg-slate-800 dark:border-slate-700 max-w-sm">
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <span>⚠️</span> Disable Referrals?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Your properties will no longer be visible to other agents in the marketplace. Existing scheduled
              inspections will not be affected.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={confirmDisable}
                className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-red-600 transition-colors"
              >
                Disable Referrals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
