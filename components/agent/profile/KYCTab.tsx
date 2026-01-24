"use client";

import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Camera,
  ArrowRight,
  Check,
  Hourglass,
  ShieldCheck,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { kycService, KYCDocument, DocumentType } from "@/services/kyc.service";

interface DocumentUpload {
  file: File | null;
  preview: string | null;
  status:
    | "idle"
    | "uploading"
    | "success"
    | "error"
    | "pending"
    | "approved"
    | "rejected";
  error?: string;
  existingDoc?: KYCDocument;
}

export default function KYCTab() {
  const [ninDocument, setNinDocument] = useState<DocumentUpload>({
    file: null,
    preview: null,
    status: "idle",
  });
  const [selfieDocument, setSelfieDocument] = useState<DocumentUpload>({
    file: null,
    preview: null,
    status: "idle",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);

  const ninInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing documents and document types on mount
  useEffect(() => {
    const fetchExistingDocuments = async () => {
      try {
        const [docs, types] = await Promise.all([
          kycService.getMyDocuments(),
          kycService.getDocumentTypes(),
        ]);

        setDocumentTypes(types);

        // Find NIN document (by name 'nin')
        const ninType = types.find((t) => t.name.toLowerCase() === "nin");
        const selfieType = types.find(
          (t) => t.name.toLowerCase() === "voter's card",
        ); // Temporary workaround

        // Match submitted docs to types
        // Since /kyc/documents/user doesn't include documentType, we need to match differently
        // For now, assume first doc is NIN and second is selfie if they exist
        if (docs.length > 0) {
          // If we have docs, check by order or by some logic
          docs.forEach((doc, index) => {
            const status = doc.status.toLowerCase() as
              | "pending"
              | "approved"
              | "rejected";
            if (index === 0) {
              setNinDocument({
                file: null,
                preview: doc.url,
                status,
                existingDoc: doc,
                error: doc.comment || undefined,
              });
            } else if (index === 1) {
              setSelfieDocument({
                file: null,
                preview: doc.url,
                status,
                existingDoc: doc,
                error: doc.comment || undefined,
              });
            }
          });
        }
      } catch (error: any) {
        console.error("Failed to fetch existing documents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingDocuments();
  }, []);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    setDocument: React.Dispatch<React.SetStateAction<DocumentUpload>>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or PDF file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Create preview for images
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null;

    setDocument({
      file,
      preview,
      status: "idle",
    });
  };

  const handleSubmit = async () => {
    // Determine what needs to be uploaded
    const needsNinUpload =
      ninDocument.file &&
      (ninDocument.status === "idle" ||
        ninDocument.status === "rejected" ||
        ninDocument.status === "error");
    const needsSelfieUpload =
      selfieDocument.file &&
      (selfieDocument.status === "idle" ||
        selfieDocument.status === "rejected" ||
        selfieDocument.status === "error");

    // Check if NIN needs upload (not already pending/approved)
    const ninReady =
      ninDocument.file || ["pending", "approved"].includes(ninDocument.status);
    const selfieReady =
      selfieDocument.file ||
      ["pending", "approved"].includes(selfieDocument.status);

    if (!ninReady || !selfieReady) {
      toast.error("Please upload both NIN slip and selfie");
      return;
    }

    if (!needsNinUpload && !needsSelfieUpload) {
      toast.info("No new documents to upload");
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, using placeholder URLs since we don't have file upload to storage yet
      // TODO: Implement actual file upload to S3/Cloudinary first
      const placeholderUrl = "https://placeholder.domihive.com/kyc-document";

      // Upload NIN document only if needed
      if (needsNinUpload) {
        setNinDocument((prev) => ({ ...prev, status: "uploading" }));
        await kycService.uploadNIN(placeholderUrl);
        setNinDocument((prev) => ({ ...prev, status: "pending" }));
      }

      // Upload Selfie document only if needed
      if (needsSelfieUpload) {
        setSelfieDocument((prev) => ({ ...prev, status: "uploading" }));
        await kycService.uploadSelfie(placeholderUrl);
        setSelfieDocument((prev) => ({ ...prev, status: "pending" }));
      }

      toast.success("Documents submitted successfully! Awaiting review.");
    } catch (error: any) {
      console.error("KYC submission error:", error);

      // Check if it's the "already uploaded" error
      if (error.message?.includes("already uploaded")) {
        toast.error(
          "You have already submitted these documents. You can only re-upload if they are rejected.",
        );
      } else {
        toast.error(
          error.message || "Failed to submit documents. Please try again.",
        );
      }

      // Mark current uploading doc as error
      if (ninDocument.status === "uploading") {
        setNinDocument((prev) => ({
          ...prev,
          status: "error",
          error: error.message,
        }));
      }
      if (selfieDocument.status === "uploading") {
        setSelfieDocument((prev) => ({
          ...prev,
          status: "error",
          error: error.message,
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: DocumentUpload["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const renderUploadBox = (
    title: string,
    subtitle: string,
    document: DocumentUpload,
    inputRef: React.RefObject<HTMLInputElement | null>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon: React.ReactNode,
  ) => {
    const hasFile = document.file !== null;
    const isUploading = document.status === "uploading";
    const isSuccess = document.status === "success";
    const isPending = document.status === "pending";
    const isApproved = document.status === "approved";
    const isRejected = document.status === "rejected";
    const isError = document.status === "error";
    const hasExistingDoc = !!document.existingDoc;

    // Can only re-upload if rejected
    const canUpload = !isUploading && !isPending && !isApproved;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
            {title}
          </label>
          {getStatusBadge(document.status)}
        </div>

        {/* Show rejection comment */}
        {isRejected && document.error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-300">
            <strong>Rejection reason:</strong> {document.error}
          </div>
        )}

        <div
          onClick={() => canUpload && inputRef.current?.click()}
          className={`relative flex justify-center items-center w-full bg-white/50 dark:bg-slate-800/50 border-2 border-dashed rounded-xl p-6 text-center transition-all
                        ${
                          isPending
                            ? "border-yellow-400 bg-yellow-50/50 dark:bg-yellow-900/20 cursor-default"
                            : isApproved
                              ? "border-green-400 bg-green-50/50 dark:bg-green-900/20 cursor-default"
                              : isRejected
                                ? "border-red-400 bg-red-50/50 dark:bg-red-900/20 cursor-pointer hover:bg-red-100/50"
                                : isError
                                  ? "border-red-400 bg-red-50/50 dark:bg-red-900/20"
                                  : hasFile
                                    ? "border-purple-400 bg-purple-50/50 dark:bg-purple-900/20"
                                    : "border-slate-300 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/80"
                        }
                        ${canUpload ? "cursor-pointer" : "cursor-default"}
                    `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            className="hidden"
            onChange={onChange}
            disabled={!canUpload}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-purple-500">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="font-semibold">Uploading...</p>
            </div>
          ) : isPending ? (
            <div className="flex flex-col items-center gap-2 text-yellow-600 dark:text-yellow-400">
              <Clock className="w-8 h-8" />
              <p className="font-semibold">Pending Review</p>
              <p className="text-xs">
                Document submitted, awaiting verification
              </p>
            </div>
          ) : isApproved ? (
            <div className="flex flex-col items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-8 h-8" />
              <p className="font-semibold">Approved</p>
              <p className="text-xs">Document verified successfully</p>
            </div>
          ) : isRejected ? (
            <div className="flex flex-col items-center gap-2 text-red-600 dark:text-red-400">
              <XCircle className="w-8 h-8" />
              <p className="font-semibold">Rejected - Click to Re-upload</p>
              <p className="text-xs">Please upload a new document</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-8 h-8" />
              <p className="font-semibold">Upload Failed</p>
              <p className="text-xs">{document.error || "Please try again"}</p>
            </div>
          ) : hasFile ? (
            <div className="flex flex-col items-center gap-2">
              {document.preview ? (
                <img
                  src={document.preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <FileText className="w-8 h-8 text-purple-500" />
              )}
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                {document.file?.name}
              </p>
              <p className="text-xs text-slate-500">Click to change</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
              {icon}
              <p className="font-semibold">{subtitle}</p>
              <p className="text-xs">JPG, PNG or PDF (max 5MB)</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Determine overall status
  const ninSubmitted = ["pending", "approved", "rejected"].includes(
    ninDocument.status,
  );
  const selfieSubmitted = ["pending", "approved", "rejected"].includes(
    selfieDocument.status,
  );
  const allSubmitted = ninSubmitted && selfieSubmitted;
  const allApproved =
    ninDocument.status === "approved" && selfieDocument.status === "approved";
  const anyRejected =
    ninDocument.status === "rejected" || selfieDocument.status === "rejected";

  // Check if each document is ready (either has file or already pending/approved)
  const ninReady =
    ninDocument.file || ["pending", "approved"].includes(ninDocument.status);
  const selfieReady =
    selfieDocument.file ||
    ["pending", "approved"].includes(selfieDocument.status);

  // Has something new to upload
  const hasNewNinFile =
    ninDocument.file && !["pending", "approved"].includes(ninDocument.status);
  const hasNewSelfieFile =
    selfieDocument.file &&
    !["pending", "approved"].includes(selfieDocument.status);
  const hasAnyNewFile = hasNewNinFile || hasNewSelfieFile;

  // Can submit if both ready AND there's something new to upload
  const canSubmit = ninReady && selfieReady && hasAnyNewFile && !isSubmitting;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Form */}
      <div className="lg:col-span-2">
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-soft border border-white/50 dark:border-white/10">
          <div className="space-y-8">
            {/* NIN Document Upload */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <FileText className="text-[#0F172A] w-5 h-5" />
                NIN Slip Upload
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Upload a clear image or PDF of your National Identification
                Number (NIN) slip.
              </p>
              {renderUploadBox(
                "NIN Slip",
                "Upload your NIN slip",
                ninDocument,
                ninInputRef,
                (e) => handleFileSelect(e, setNinDocument),
                <Upload className="w-8 h-8 text-[#0F172A]" />,
              )}
            </div>

            {/* Selfie Upload */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Camera className="text-[#0F172A] w-5 h-5" />
                Selfie Verification
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Take or upload a clear selfie. Ensure your face is clearly
                visible and well-lit.
              </p>
              {renderUploadBox(
                "Selfie",
                "Take or upload a selfie",
                selfieDocument,
                selfieInputRef,
                (e) => handleFileSelect(e, setSelfieDocument),
                <Camera className="w-8 h-8 text-[#0F172A]" />,
              )}
            </div>
          </div>

          <div className="pt-8">
            {allApproved ? (
              <div className="w-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Verification Complete - Account Verified
              </div>
            ) : allSubmitted && !anyRejected ? (
              <div className="w-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                Documents Submitted - Awaiting Review
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : anyRejected ? (
                  <>
                    <span>Re-submit Documents</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <span>Submit for Review</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Timeline */}
      <div className="col-span-1">
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-soft border border-white/50 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
            Review Status Timeline
          </h2>
          <div className="relative space-y-10">
            {/* Timeline Line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>

            <div className="relative">
              <div className="flex items-start gap-5">
                <div
                  className={`z-10 w-10 h-10 flex-shrink-0 ${allSubmitted ? "bg-[#0F172A]" : "bg-slate-200 dark:bg-slate-700"} rounded-full flex items-center justify-center shadow-md ${allSubmitted ? "shadow-slate-900/20" : ""}`}
                >
                  <Check
                    className={`w-5 h-5 ${allSubmitted ? "text-white" : "text-slate-400"}`}
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">
                    Documents Submitted
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {allSubmitted
                      ? "Your documents have been submitted"
                      : "Upload and submit your documents"}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-5">
                <div
                  className={`z-10 w-10 h-10 flex-shrink-0 ${allSubmitted && !allApproved ? "bg-[#0F172A]" : "bg-slate-200 dark:bg-slate-700"} rounded-full flex items-center justify-center ${allSubmitted && !allApproved ? "shadow-md shadow-slate-900/20" : ""}`}
                >
                  <Hourglass
                    className={`w-5 h-5 ${allSubmitted && !allApproved ? "text-white" : "text-slate-400"}`}
                  />
                </div>
                <div>
                  <p
                    className={`font-semibold ${allSubmitted && !allApproved ? "text-slate-700 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    Under Review
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Our team is currently reviewing your documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-5">
                <div
                  className={`z-10 w-10 h-10 flex-shrink-0 ${allApproved ? "bg-[#0F172A]" : "bg-slate-200 dark:bg-slate-700"} rounded-full flex items-center justify-center ${allApproved ? "shadow-md shadow-slate-900/20" : ""}`}
                >
                  <ShieldCheck
                    className={`w-5 h-5 ${allApproved ? "text-white" : "text-slate-400"}`}
                  />
                </div>
                <div>
                  <p
                    className={`font-semibold ${allApproved ? "text-slate-700 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    Verification Complete
                  </p>
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    {allApproved
                      ? "Your account has been verified!"
                      : "Your account will be updated upon approval."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
