"use client"

import { BarChart3, Users, TrendingUp, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Dashboard() {
  const stats = [
    {
      label: "Total Responses",
      value: "24",
      change: "+12% this month",
      icon: Users,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Success Rate",
      value: "78%",
      change: "+5% improvement",
      icon: TrendingUp,
      color: "from-green-400 to-green-600",
    },
    {
      label: "Avg Response Time",
      value: "2.3 hrs",
      change: "-15 min faster",
      icon: Clock,
      color: "from-purple-400 to-purple-600",
    },
    {
      label: "Active Leads",
      value: "12",
      change: "+3 new today",
      icon: BarChart3,
      color: "from-orange-400 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your agent performance overview</p>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-border bg-card hover:bg-muted transition-colors p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity Section */}
        <Card className="border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <div>
                <p className="text-foreground font-medium">Sarah Johnson responded</p>
                <p className="text-muted-foreground text-sm">Downtown District - $450k budget</p>
              </div>
              <span className="text-muted-foreground text-xs">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <div>
                <p className="text-foreground font-medium">New request from Michael Chen</p>
                <p className="text-muted-foreground text-sm">Riverside Area - Waterfront property</p>
              </div>
              <span className="text-muted-foreground text-xs">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <div>
                <p className="text-foreground font-medium">Inspection scheduled</p>
                <p className="text-muted-foreground text-sm">Tech Park District - 2PM Tomorrow</p>
              </div>
              <span className="text-muted-foreground text-xs">1 day ago</span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
