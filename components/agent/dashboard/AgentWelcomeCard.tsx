import React from "react";

export default function AgentWelcomeCard() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Night";
  };

  return (
    <div className="bg-gradient-to-br from-orange-100/80 to-blue-100/80 border border-white/50 rounded-[32px] p-6 md:p-10 mb-8 flex flex-col md:flex-row md:items-center justify-between backdrop-blur-md gap-4 md:gap-0 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-white/10">
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight md:leading-9 m-0 mb-2">
          {getGreeting()}, Jessica! 👋
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-6 m-0">
          Your command center for today.
        </p>
      </div>
    </div>
  );
}
