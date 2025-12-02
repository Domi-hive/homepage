import React, { useState } from 'react';
import { X, AlertTriangle, Calendar } from 'lucide-react';

interface CancellationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (details: { reason: string; category: string }) => void;
}

type Step = 'reason' | 'confirmation';

export default function CancellationModal({ isOpen, onClose, onSubmit }: CancellationModalProps) {
    const [step, setStep] = useState<Step>('reason');
    const [noShowReason, setNoShowReason] = useState('');
    const [otherReasonDetails, setOtherReasonDetails] = useState('');

    React.useEffect(() => {
        if (isOpen) {
            setStep('reason');
            setNoShowReason('');
            setOtherReasonDetails('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleReschedule = () => {
        console.log("Reschedule clicked - placeholder");
        // Logic to navigate to reschedule placeholder or modal would go here
        onClose();
    };

    const renderReasonStep = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-slate-800">Why didn't it happen?</h3>
                <p className="text-slate-500 mt-1">Select the main reason.</p>
            </div>

            <div className="space-y-3">
                {['Agent didn\'t show up', 'I couldn\'t make it', 'Properties unavailable', 'Weather / Emergency', 'Other'].map((reason) => (
                    <label key={reason} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                        <input
                            type="radio"
                            name="noShowReason"
                            value={reason}
                            checked={noShowReason === reason}
                            onChange={(e) => setNoShowReason(e.target.value)}
                            className="w-5 h-5 text-red-600 border-slate-300 focus:ring-red-500"
                        />
                        <span className="font-medium text-slate-700">{reason}</span>
                    </label>
                ))}
            </div>

            {noShowReason === 'Other' && (
                <textarea
                    value={otherReasonDetails}
                    onChange={(e) => setOtherReasonDetails(e.target.value)}
                    placeholder="Please explain why the inspection didn't happen..."
                    className="w-full h-24 p-4 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none resize-none animate-in fade-in slide-in-from-top-2 duration-200"
                />
            )}

            <div className="space-y-3">
                <button
                    onClick={() => setStep('confirmation')}
                    disabled={!noShowReason || (noShowReason === 'Other' && !otherReasonDetails.trim())}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-lg shadow-red-600/20"
                >
                    Proceed with Cancellation
                </button>

                <button
                    onClick={handleReschedule}
                    className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    <Calendar className="w-5 h-5 text-slate-500" />
                    Reschedule Instead
                </button>
            </div>
        </div>
    );

    const renderConfirmationStep = () => (
        <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-slate-800">Are you sure?</h3>
                <p className="text-slate-500 mt-2">Cancelling this inspection may affect your completion rate. This action cannot be undone.</p>
            </div>

            <div className="space-y-3 pt-4">
                <button
                    onClick={() => onSubmit({
                        reason: noShowReason === 'Other' ? otherReasonDetails : noShowReason,
                        category: noShowReason === 'Other' ? 'Other' : noShowReason
                    })}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-lg shadow-red-600/20"
                >
                    Confirm Cancellation
                </button>
                <button
                    onClick={() => setStep('reason')}
                    className="w-full text-slate-500 font-medium hover:text-slate-800 py-2"
                >
                    Go Back
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">
                        {step === 'reason' ? 'Cancel Inspection' : 'Confirm Cancellation'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {step === 'reason' && renderReasonStep()}
                {step === 'confirmation' && renderConfirmationStep()}
            </div>
        </div>
    );
}
