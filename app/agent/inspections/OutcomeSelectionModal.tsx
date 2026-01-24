import React, { useState } from "react";
import {
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Star,
  ChevronRight,
} from "lucide-react";

interface OutcomeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    outcome: "satisfied" | "issues" | "did_not_happen",
    details?: any,
  ) => void;
  initialStep?: Step;
}

type Step = "selection" | "satisfied" | "issues";

export default function OutcomeSelectionModal({
  isOpen,
  onClose,
  onSubmit,
  initialStep = "selection",
}: OutcomeSelectionModalProps) {
  const [step, setStep] = useState<Step>(initialStep);
  const [rating, setRating] = useState(0);
  const [issueDetails, setIssueDetails] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
    }
  }, [isOpen, initialStep]);

  if (!isOpen) return null;

  const handleBack = () => {
    setStep("selection");
    setRating(0);
    setIssueDetails("");
  };

  const renderSelectionStep = () => (
    <div className="space-y-4">
      <button
        onClick={() => onSubmit("satisfied")}
        className="w-full bg-white hover:bg-green-50 border-2 border-slate-100 hover:border-green-200 p-4 rounded-2xl flex items-center gap-4 transition-all group text-left"
      >
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-slate-800 text-lg">
            Completed - Satisfied
          </p>
          <p className="text-sm text-slate-500">
            Inspection went well, no issues.
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-green-500" />
      </button>

      <button
        onClick={() => setStep("issues")}
        className="w-full bg-white hover:bg-amber-50 border-2 border-slate-100 hover:border-amber-200 p-4 rounded-2xl flex items-center gap-4 transition-all group text-left"
      >
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-slate-800 text-lg">
            Completed - Had Issues
          </p>
          <p className="text-sm text-slate-500">
            Property not as described, etc.
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500" />
      </button>
    </div>
  );

  const renderIssuesStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800">What went wrong?</h3>
        <p className="text-slate-500 mt-1">
          Please provide details so our team can review.
        </p>
      </div>

      <textarea
        value={issueDetails}
        onChange={(e) => setIssueDetails(e.target.value)}
        placeholder="Describe the issue (e.g., property was different from photos, agent was rude...)"
        className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none resize-none"
      />

      <button
        onClick={() => onSubmit("issues", { details: issueDetails })}
        disabled={!issueDetails.trim()}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-lg shadow-amber-500/20"
      >
        Submit for Review
      </button>
      <button
        onClick={handleBack}
        className="w-full text-slate-500 font-medium hover:text-slate-800"
      >
        Back
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {step === "selection" ? "Inspection Outcome" : ""}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {step === "selection" && renderSelectionStep()}
        {step === "satisfied" && renderSatisfiedStep()}
        {step === "issues" && renderIssuesStep()}
      </div>
    </div>
  );
}
