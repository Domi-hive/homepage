"use client"

import {
  Wallet,
  Bell,
  Banknote,
  Calendar,
  Users,
  Star,
  Phone,
  Check,
  Clock,
  MessageCircle,
  UserPlus,
  Plus,
  Home,
  Share2,
  CheckCircle2,
  MessageSquare,
  Briefcase
} from "lucide-react"
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"

import AgentWelcomeCard from "@/components/agent/dashboard/AgentWelcomeCard"

export default function Dashboard() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] dark:bg-[#121826]">
      <div
        className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      <div className="relative z-10 p-8 h-full overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white hidden md:block">Dashboard</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <button className="relative text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link href="/agent/profile" className="hover:opacity-80 transition-opacity">
              <img
                alt="Jessica's avatar"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A"
              />
            </Link>
          </div>
        </header>

        <AgentWelcomeCard />

        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm dark:bg-[#1A2233] p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/20 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-600 dark:text-slate-300">Total Earnings</h3>
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Banknote className="text-green-500 w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800 dark:text-white mt-4">₦1.2M</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm dark:bg-[#1A2233] p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/20 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-600 dark:text-slate-300">Upcoming Inspections</h3>
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Calendar className="text-blue-500 w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800 dark:text-white mt-4">5</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm dark:bg-[#1A2233] p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/20 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-600 dark:text-slate-300">Active Leads</h3>
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Users className="text-purple-500 w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800 dark:text-white mt-4">12</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm dark:bg-[#1A2233] p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/20 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-600 dark:text-slate-300">Agent Rating</h3>
                <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Star className="text-yellow-500 w-6 h-6 fill-current" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800 dark:text-white mt-4">4.85</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Schedule */}
              <div className="bg-white/80 backdrop-blur-sm dark:bg-[#1A2233] p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Today's Schedule</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 gap-4 sm:gap-0">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 w-28">09:00 AM</span>
                    <div className="sm:border-l border-slate-200 dark:border-slate-700 sm:pl-4 sm:ml-4 flex-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Inspection</p>
                      <p className="text-sm text-slate-500">24, Maple Drive, Asokoro</p>
                    </div>
                    <span className="text-sm text-slate-500 mr-4">With Sarah J.</span>
                    <div className="flex items-center gap-2 ml-auto sm:ml-0">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-500 hover:bg-blue-200 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-500 hover:bg-green-200 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 gap-4 sm:gap-0">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 w-28">11:30 AM</span>
                    <div className="sm:border-l border-slate-200 dark:border-slate-700 sm:pl-4 sm:ml-4 flex-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Client Meeting</p>
                      <p className="text-sm text-slate-500">DomiHive HQ, Wuse II</p>
                    </div>
                    <span className="text-sm text-slate-500 mr-4">With David C.</span>
                    <div className="flex items-center gap-2 ml-auto sm:ml-0">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-500 hover:bg-blue-200 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-500 hover:bg-green-200 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 gap-4 sm:gap-0">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 w-28">02:00 PM</span>
                    <div className="sm:border-l border-slate-200 dark:border-slate-700 sm:pl-4 sm:ml-4 flex-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Property Showing</p>
                      <p className="text-sm text-slate-500">18, Ocean View, Maitama</p>
                    </div>
                    <span className="text-sm text-slate-500 mr-4">With Muhammad K.</span>
                    <div className="flex items-center gap-2 ml-auto sm:ml-0">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-500 hover:bg-blue-200 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-500 hover:bg-green-200 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgent Actions */}
              <div className="bg-white/80 backdrop-blur-sm dark:bg-[#1A2233] p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Urgent Actions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50/80 dark:bg-orange-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                        <Clock className="text-orange-500 w-5 h-5" />
                      </div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">2 Pending inspection confirmations</p>
                    </div>
                    <button className="text-sm font-semibold text-[#2E6BFF] hover:underline">View</button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50/80 dark:bg-purple-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                        <MessageCircle className="text-purple-500 w-5 h-5" />
                      </div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">5 Unanswered Q&As</p>
                    </div>
                    <button className="text-sm font-semibold text-[#2E6BFF] hover:underline">Reply</button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/80 dark:bg-blue-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                        <UserPlus className="text-blue-500 w-5 h-5" />
                      </div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">1 New high-match request</p>
                    </div>
                    <button className="text-sm font-semibold text-[#2E6BFF] hover:underline">Match</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm dark:bg-[#1A2233] p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <Plus className="text-[#2E6BFF] w-6 h-6" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Upload New Property</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <Home className="text-[#2E6BFF] w-6 h-6" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">My Listings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <Share2 className="text-[#2E6BFF] w-6 h-6" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Share Profile</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="bg-white/80 backdrop-blur-sm dark:bg-[#1A2233] p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Recent Activity Feed</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Inspection confirmed for <span className="font-bold">#P-58291</span>.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">2 min ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="text-blue-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        New message from <span className="font-bold">Sarah J.</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">15 min ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-purple-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Property <span className="font-bold">"Luxury Villa"</span> is now live.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                      <Star className="text-yellow-500 w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        You received a 5-star review from <span className="font-bold">David C.</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
