"use client"

import { useState } from "react"
import { ChevronRight, Plus, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ClientRequests() {
  const [activeRequest, setActiveRequest] = useState<{
    id: string
    title: string
    createdDate: string
    agentsResponded: number
    properties: number
    activeQAs: number
    inBasket: number
  } | null>({
    id: "1",
    title: "2-3 bed in Lekki, VI, Ikoyi | Budget: N2-4M",
    createdDate: "2 days ago",
    agentsResponded: 5,
    properties: 18,
    activeQAs: 3,
    inBasket: 4,
  })

  const requestHistory = [
    {
      id: "2",
      title: "3-bed in Ikoyi, Lekki",
      completionDate: "Jan 15, 2025",
      status: "completed",
      agentsResponded: 5,
      inspectionsCompleted: 2,
    },
    {
      id: "3",
      title: "2-bed in Victoria Island",
      completionDate: "Dec 28, 2024",
      status: "completed",
      agentsResponded: 3,
      inspectionsCompleted: 1,
    },
    {
      id: "4",
      title: "4-bed in Banana Island",
      completionDate: "Dec 10, 2024",
      status: "archived",
      agentsResponded: 2,
      inspectionsCompleted: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Requests</h1>
          <p className="text-muted-foreground">Manage your property search requests</p>
        </div>

        {/* Active Request Section */}
        {activeRequest ? (
          <>
            {/* Active Request Card */}
            <div className="mb-6 p-6 border-2 border-primary rounded-lg bg-card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="font-semibold text-foreground">Active Request</span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">{activeRequest.title}</h2>

              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <Calendar className="w-4 h-4" />
                <span>Created {activeRequest.createdDate}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 py-6 border-y border-border">
                <div>
                  <p className="text-2xl font-bold text-foreground">{activeRequest.agentsResponded}</p>
                  <p className="text-sm text-muted-foreground">Agents Responded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{activeRequest.properties}</p>
                  <p className="text-sm text-muted-foreground">Properties</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{activeRequest.activeQAs}</p>
                  <p className="text-sm text-muted-foreground">Active Q&As</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-500">{activeRequest.inBasket}</p>
                  <p className="text-sm text-muted-foreground">In Basket</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/requests/${activeRequest.id}/responses`}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View Responses
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <button className="px-6 py-3 border border-border hover:bg-muted rounded-lg text-foreground font-semibold transition-colors">
                  Edit
                </button>
                <button className="px-6 py-3 border border-border hover:bg-muted rounded-lg text-foreground font-semibold transition-colors">
                  Archive
                </button>
              </div>
            </div>

            {/* Warning Message */}
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                You can only have one active request at a time. Complete or archive your current request to start a new
                one.
              </p>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="mb-8 p-12 bg-card border-2 border-dashed border-border rounded-lg text-center">
            <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Active Request</h2>
            <p className="text-muted-foreground mb-6">Create a new property search request to get started</p>
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors">
              Create New Request
            </button>
          </div>
        )}

        {/* Request History Section */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-4">Request History ({requestHistory.length})</h3>

          <div className="space-y-3">
            {requestHistory.map((request) => (
              <div
                key={request.id}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-foreground">{request.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Completed on {request.completionDate}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{request.agentsResponded} agents responded</span>
                      <span>•</span>
                      <span>{request.inspectionsCompleted} inspection completed</span>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary/80 font-semibold text-sm whitespace-nowrap flex items-center gap-1">
                    View
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
