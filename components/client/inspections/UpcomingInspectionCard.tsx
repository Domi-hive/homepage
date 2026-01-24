import React from "react";
import { Eye, Calendar, XCircle } from "lucide-react";

interface UpcomingInspectionCardProps {
  date: {
    month: string;
    day: string;
    time: string;
    bgColor: string;
    textColor: string;
  };
  title: string;
  subtitle: string;
  agent: {
    name: string;
    role: string;
    image: string;
  };
}

export default function UpcomingInspectionCard({
  date,
  title,
  subtitle,
  agent,
}: UpcomingInspectionCardProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50 flex flex-col md:flex-row gap-6">
      <div
        className={`flex flex-col items-center justify-center ${date.bgColor} p-4 rounded-xl w-full md:w-24 flex-shrink-0`}
      >
        <span className={`text-sm font-semibold ${date.textColor} uppercase`}>
          {date.month}
        </span>
        <span className="text-3xl font-bold text-slate-800">{date.day}</span>
        <span className="text-sm font-semibold text-slate-500">
          {date.time}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-bold text-lg text-slate-800">{title}</p>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <svg
              className="w-6 h-6 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-700">{agent.name}</p>
            <p className="text-sm text-slate-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="w-full md:flex-1 bg-white/80 hover:bg-white text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 border border-slate-200/50">
            <Eye className="w-5 h-5" />
            <span>View Details</span>
          </button>
          <button className="w-full md:flex-1 bg-white/80 hover:bg-white text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 border border-slate-200/50">
            <Calendar className="w-5 h-5" />
            <span>Reschedule</span>
          </button>
          <button className="w-full md:flex-1 bg-white/80 hover:bg-white text-red-500 font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 border border-slate-200/50">
            <XCircle className="w-5 h-5" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
