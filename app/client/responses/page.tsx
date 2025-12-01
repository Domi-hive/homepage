'use client';

export default function ClientResponsesPage() {
    return (
        <div className="flex-1 p-10 overflow-y-auto">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Responses</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">View responses from agents.</p>
                </div>
            </header>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50 dark:border-white/10">
                <p className="text-slate-600 dark:text-slate-300">No responses yet.</p>
            </div>
        </div>
    );
}
