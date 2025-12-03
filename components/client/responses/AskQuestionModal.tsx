import React, { useState } from 'react';
import { X, Send, ChevronDown } from 'lucide-react';

interface AskQuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (question: string, category: string) => void;
    property: {
        title: string;
        location: string;
        image: string;
    };
}

export default function AskQuestionModal({ isOpen, onClose, onSubmit, property }: AskQuestionModalProps) {
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('About Property');
    const MAX_CHARS = 250;

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (question.trim()) {
            onSubmit(question, category);
            setQuestion('');
            setCategory('About Property');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-white/10 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200/80 dark:border-slate-800/80">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Ask a Question</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full p-2 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Property Details Card */}
                    <div className="flex items-center gap-4 p-4 bg-slate-100/50 dark:bg-slate-800/40 rounded-xl">
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-white">{property.title}</p>
                            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                {property.location}
                            </div>
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-2">
                        <label className="font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">Category</label>
                        <div className="relative">
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full appearance-none bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800/80 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition outline-none text-slate-800 dark:text-slate-200"
                            >
                                <option>About Property</option>
                                <option>Pricing</option>
                                <option>Inspection</option>
                                <option>Other</option>
                            </select>
                            <ChevronDown className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Question Input */}
                    <div className="space-y-2">
                        <label className="font-semibold text-slate-700 dark:text-slate-300" htmlFor="question">Your Question</label>
                        <div className="relative">
                            <textarea
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value.slice(0, MAX_CHARS))}
                                placeholder="Type your question here..."
                                rows={5}
                                className="w-full bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800/80 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none"
                            />
                            <p className="absolute bottom-3 right-4 text-xs text-slate-400 dark:text-slate-500">
                                {question.length}/{MAX_CHARS} characters
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex justify-end items-center gap-3">
                        <button
                            onClick={onClose}
                            className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!question.trim()}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30"
                        >
                            <span>Submit</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
