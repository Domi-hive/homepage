import React from "react";
import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

interface ClientHeaderProps {
  title: string;
  subtitle: string;
}

export default function ClientHeader({ title, subtitle }: ClientHeaderProps) {
  return (
    <header className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center mb-0 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-8 m-0 hidden md:block">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-6 self-end md:self-auto">
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/client/activity"
            className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
          </Link>
          <ThemeToggle />
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/client/profile">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity">
              <span className="header-user-initials">U</span>
            </div>
          </Link>
          <div className="hidden md:flex flex-col">
            <div className="text-base font-semibold text-slate-900 leading-6">
              User
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
