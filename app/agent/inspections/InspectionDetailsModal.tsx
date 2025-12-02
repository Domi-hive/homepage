import React from 'react';
import {
    X,
    Calendar,
    Clock,
    Star,
    Phone,
    MessageCircle,
    MapPin,
    Navigation,
    Info,
    CheckCircle,
    Circle
} from 'lucide-react';
import OutcomeSelectionModal from './OutcomeSelectionModal';

interface InspectionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    inspection?: any; // We'll define a proper type later if needed, for now using any to be flexible with the mock data
}

export default function InspectionDetailsModal({ isOpen, onClose, inspection }: InspectionDetailsModalProps) {
    const [isOutcomeModalOpen, setIsOutcomeModalOpen] = React.useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/80 backdrop-blur-xl w-full max-w-lg rounded-2xl shadow-2xl border border-white/50 max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="p-6 border-b border-slate-200/80 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-2xl font-bold text-slate-800">Inspection Details</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700 transition-colors p-1 hover:bg-slate-100 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                    {/* Status & Time */}
                    {/* Status & Time */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-4 text-slate-600">
                            {inspection?.status === 'pending' && (
                                <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1.5 rounded-full">
                                    Pending Completion
                                </span>
                            )}
                            {inspection?.status === 'completed' && (
                                <span className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1.5 rounded-full">
                                    Completed
                                </span>
                            )}
                            {inspection?.status === 'no-show' && (
                                <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1.5 rounded-full">
                                    No-show
                                </span>
                            )}
                            {inspection?.status === 'cancelled' && (
                                <span className="bg-slate-200 text-slate-600 text-sm font-semibold px-3 py-1.5 rounded-full">
                                    Cancelled
                                </span>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">Wednesday, 26 November 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">12:21 pm</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {inspection?.status === 'pending' && (
                            <button
                                onClick={() => setIsOutcomeModalOpen(true)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md shadow-green-600/20"
                            >
                                Mark as Complete
                            </button>
                        )}
                        {inspection?.status === 'completed' && !inspection?.isRated && (
                            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md shadow-amber-500/20 flex items-center justify-center gap-2">
                                <Star className="w-5 h-5 fill-current" />
                                <span>Rate Agent</span>
                            </button>
                        )}
                    </div>

                    {/* Agent Card */}
                    <div className="bg-slate-100/50 p-5 rounded-xl border border-slate-200/50 space-y-4">
                        <p className="text-sm font-semibold text-slate-500">Agent</p>
                        <div className="flex items-center gap-4">
                            <img
                                alt="Agent Sarah Smith"
                                className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk2beelbpXOwaUW-JrGJV44EsLEqZjn-AB8lGB9Xr3lmMaNB5O5VLIGarfv5CZs1Hmbehz_2IIB6DnGcqEq11BRiGi2LYkG9sNTBrLW5uZa1_FdjO1qxwJyFzz8PE3tFVRu_c9uP8DFNUDn2mpEt8c_vYsHAhrUg54uHr-mNrFRcnl4UqMIvY1H-zpP-s8J9oOhIQAo6DxGccf9hbDSQGG4LzDdEVzDhTgQXsAUgrVjSmREUemkR7v2PX5Lb05GF04a3nNZiRaPA"
                            />
                            <div className="flex-1">
                                <p className="font-bold text-slate-800 text-lg">Sarah Smith</p>
                                <p className="text-sm text-slate-500">+234 802 345 6789</p>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-semibold text-sm">4.9</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:-translate-y-0.5">
                                <Phone className="w-4 h-4" />
                                <span>Call</span>
                            </button>
                            <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:-translate-y-0.5">
                                <MessageCircle className="w-4 h-4" />
                                <span>WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Properties */}
                    <div>
                        <p className="text-sm font-semibold text-slate-500 mb-3">Properties (2)</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="group cursor-pointer">
                                <div className="overflow-hidden rounded-xl mb-2 border border-slate-100 shadow-sm">
                                    <img
                                        alt="4 Bedroom Duplex"
                                        className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnvMBwjpXw56aMs_fy1WzwuB504SrXepKjyPedZAmpYDV9tgr1X77vDeJvOpCvQ3lICdZEomXeqZjNdIa7I2_MUClnWDP8dBAQ0SyZpf4L82Td9_c3Iglvh00pzhab7DEPJ6Zksh1CF7tfs23RQ_xuVjWUlLdf2x9Dg-g7DJ7UqthnzVZTs_SneCUS8bsdspp2y_-W4VH9kKFTDZm5kivPxUotFFQhegYp1rewzioWEGX9O2E6qYdsuGA2en91ryhp8sVOIYzyKw"
                                    />
                                </div>
                                <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">4 Bedroom Duplex</p>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="overflow-hidden rounded-xl mb-2 border border-slate-100 shadow-sm">
                                    <img
                                        alt="3 Bedroom Bungalow"
                                        className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuADb6PJFOeQ1wHR2I5gENf10PaWVNbClJ_50Ywt6LIvfjuR7fkVc13CQkBqbCGG9P8VnZkuMohhSizfljSHhMSTpn9Z0FJ6duq5KPbUuZeXmvkB5P1ZuGOK98G8jqef6lL_IYURZxplWogGQq5ZtPDjkVRD0cC8-cOK9m4EXOUqw-ZxN-q1sQ3h0EkEq4OXuxAyjBg31pUjPvyyLSKjImOJRLGKii5GsxYKw3hKh8-BALOAXR0ksKofZCg_0Hpj0jmgfxo95PR7aw"
                                    />
                                </div>
                                <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">3 Bedroom Bungalow</p>
                            </div>
                        </div>
                    </div>

                    {/* Meeting Point */}
                    <div className="bg-slate-100/50 p-5 rounded-xl border border-slate-200/50 space-y-3">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-purple-600" />
                            <p className="text-sm font-semibold text-slate-500">Meeting Point</p>
                        </div>
                        <p className="font-semibold text-slate-800 text-lg">Ajah Roundabout, Lagos</p>
                        <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-purple-600 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:-translate-y-0.5">
                            <Navigation className="w-4 h-4" />
                            <span>Get Directions</span>
                        </button>
                    </div>

                    {/* Payment */}
                    <div className="bg-slate-100/50 p-5 rounded-xl border border-slate-200/50 flex justify-between items-center">
                        <div>
                            <p className="text-sm font-semibold text-slate-500">Payment</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">₦15,000</p>
                        </div>
                        <span className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1.5 rounded-full border border-green-200">
                            Paid
                        </span>
                    </div>

                    {/* Timeline */}
                    <div>
                        <p className="text-sm font-semibold text-slate-500 mb-4">Activity Timeline</p>
                        <div className="space-y-6 relative pl-5">
                            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200"></div>

                            <div className="relative">
                                <div className="absolute -left-[18px] top-1.5 w-3.5 h-3.5 bg-slate-400 rounded-full border-2 border-white shadow-sm"></div>
                                <p className="font-semibold text-slate-800">Payment made</p>
                                <p className="text-xs text-slate-500 mt-0.5">21 Nov at 2:21 pm</p>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-[18px] top-1.5 w-3.5 h-3.5 bg-slate-400 rounded-full border-2 border-white shadow-sm"></div>
                                <p className="font-semibold text-slate-800">Inspection scheduled</p>
                                <p className="text-xs text-slate-500 mt-0.5">21 Nov at 2:21 pm</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>


            <OutcomeSelectionModal
                isOpen={isOutcomeModalOpen}
                onClose={() => setIsOutcomeModalOpen(false)}
                onSubmit={(outcome, details) => {
                    console.log('Outcome submitted:', outcome, details);
                    setIsOutcomeModalOpen(false);
                    // Here you would typically update the inspection status in your backend/state
                    onClose(); // Close the details modal as well if desired
                }}
            />
        </div >
    );
}
