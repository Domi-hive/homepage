"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Home, UserCheck } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-br from-[#fff7ed] to-[#e3eeff] relative overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-top opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: "url('/assets/full_page_background.png')" }}
      />

      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <div className="text-sm sm:text-base text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#F59E0B] hover:underline"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              How will you use DomiHive?
            </h1>
            <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
              Choose your role to get started. This will help us tailor your
              experience on our platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
            {/* Client Card */}
            <Link
              href="/signup/client"
              className="group flex flex-col items-start bg-white/60 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_0_rgba(100,100,150,0.25)] hover:border-[#F59E0B] h-full"
            >
              <div className="p-6 flex flex-col flex-grow w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#F59E0B]/10 p-2 rounded-full text-[#F59E0B]">
                    <Home className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                    I'm a Client
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-4 flex-grow">
                  Looking for a new property to rent or buy. Find your dream
                  home with our powerful search tools and expert guidance.
                </p>
                <div className="flex items-center font-semibold text-[#F59E0B] text-sm mt-auto group-hover:gap-2 transition-all">
                  <span>Get Started</span>
                  <span className="material-symbols-outlined ml-1 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>

            {/* Agent Card */}
            <Link
              href="/signup/agent"
              className="group flex flex-col items-start bg-white/60 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_0_rgba(100,100,150,0.25)] hover:border-[#0F172A] h-full"
            >
              <div className="p-6 flex flex-col flex-grow w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#0F172A]/10 p-2 rounded-full text-[#0F172A]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                    I'm an Agent
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-4 flex-grow">
                  Managing properties and connecting with clients. Grow your
                  business with our suite of professional tools.
                </p>
                <div className="flex items-center font-semibold text-[#0F172A] text-sm mt-auto group-hover:gap-2 transition-all">
                  <span>Continue as Agent</span>
                  <span className="material-symbols-outlined ml-1 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
