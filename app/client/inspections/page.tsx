"use client"

import { X } from "lucide-react"
import { useState } from "react"

// ... existing code (PropertyDetailsModal, QADrawer, QuestionBuilderModal functions) ...

function TimeSlotModal({
  agentId,
  timeSlots = [], // provide default empty array to prevent undefined error
  selectedSlot,
  onSelectSlot,
  onClose,
  agentName,
  propertyTitle,
  propertyImage,
  propertyLocation,
}: {
  agentId: string
  timeSlots?: string[] // make optional with default
  selectedSlot?: string
  onSelectSlot: (slot: string) => void
  onClose: () => void
  agentName: string
  propertyTitle?: string
  propertyImage?: string
  propertyLocation?: string
}) {
  const [selectedDate, setSelectedDate] = useState("Mon Nov 3")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Book an Inspection</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Property Details */}
          <div className="mb-6 flex gap-4 pb-6 border-b border-border">
            <div className="h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              <img
                src={propertyImage || "/placeholder.svg"}
                alt={propertyTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-lg">{propertyTitle}</h3>
              <p className="text-sm text-muted-foreground mt-1">{propertyLocation}</p>
            </div>
          </div>

          {/* Date/Time Section */}
          <h3 className="font-bold text-foreground mb-4 text-lg">Select an inspection date and time</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Your inspection will be booked after confirming your contact details.
          </p>

          {/* Date Selector (3 columns) */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {["Mon Nov 3", "Tue Nov 4", "Wed Nov 5"].map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedDate === date
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                <div className="font-bold text-center">{date.split(" ")[0]}</div>
                <div className="text-sm text-center">
                  {date.split(" ")[1]} {date.split(" ")[2]}
                </div>
              </button>
            ))}
          </div>

          {/* Time Slots (Grid) */}
          <h4 className="font-semibold text-foreground mb-3">Available times</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timeSlots?.length > 0 ? ( // add optional chaining and length check
              timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onSelectSlot(slot)}
                  className={`py-3 px-2 rounded-lg border-2 transition-all font-medium text-sm ${
                    selectedSlot === slot
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p className="text-muted-foreground col-span-full text-center py-4">No available time slots</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSelectSlot(selectedSlot || timeSlots?.[0] || "")} // add optional chaining and fallback
            disabled={!selectedSlot}
            className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimeSlotModal
