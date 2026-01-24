"use client";

import React, { useState } from "react";
import {
  X,
  Upload,
  MapPin,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Calendar,
  DollarSign,
  Edit3,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { listingService } from "@/services/listing.service";
import { toast } from "sonner";

interface AddPropertyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPropertyDrawer({
  isOpen,
  onClose,
}: AddPropertyDrawerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    offerType: "rent",
    propertyType: "",
    currency: "₦",
    price: "",
    address: "",
    state: "",
    neighborhood: "",
    beds: "",
    baths: "",
    sqm: "",
    description: "",
    meetingPoint: "",
    availableDays: [] as string[],
    referralEnabled: false,
  });

  const [inspectionPoints, setInspectionPoints] = useState<string[]>([]);
  const [isLoadingPoints, setIsLoadingPoints] = useState(false);
  const [pointsError, setPointsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLastStep = currentStep === 5;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    // Handle select elements that might use name instead of id if needed, but HTML uses id
    const key = id || e.target.name;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const currentDays = prev.availableDays || [];
      if (currentDays.includes(day)) {
        return { ...prev, availableDays: currentDays.filter((d) => d !== day) };
      } else {
        return { ...prev, availableDays: [...currentDays, day] };
      }
    });
  };

  const fetchInspectionPoints = async () => {
    setIsLoadingPoints(true);
    setPointsError("");
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, this would use formData.state and formData.neighborhood
      // const response = await fetch(`/api/inspection-points?state=${formData.state}&neighborhood=${formData.neighborhood}`);

      // Mock response
      const mockPoints = [
        "Estate Main Gate",
        "Community Center",
        "Police Station Junction",
        "Market Square",
        "Mall Entrance",
      ];

      setInspectionPoints(mockPoints);
    } catch (err) {
      setPointsError("Failed to load inspection points");
    } finally {
      setIsLoadingPoints(false);
    }
  };

  React.useEffect(() => {
    if (currentStep === 3) {
      fetchInspectionPoints();
    }
  }, [currentStep]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Map offerType to API expected format
  const mapOfferType = (type: string): string => {
    switch (type) {
      case "rent":
        return "for_rent";
      case "sale":
        return "for_sale";
      case "shortlet":
        return "for_rent"; // shortlet is a type of rent
      default:
        return "for_rent";
    }
  };

  // Temporary property type ID mapping (until we have proper API)
  const getPropertyTypeId = (type: string): string => {
    // TODO: Replace with actual API lookup or proper mapping
    const typeMap: Record<string, string> = {
      apartment: "f570b5b5-8940-4864-a89b-261db3ce1ade",
      duplex: "f570b5b5-8940-4864-a89b-261db3ce1ade",
      penthouse: "f570b5b5-8940-4864-a89b-261db3ce1ade",
      bungalow: "f570b5b5-8940-4864-a89b-261db3ce1ade",
    };
    return typeMap[type] || "f570b5b5-8940-4864-a89b-261db3ce1ade";
  };

  // Generate inspection dates from available days (next 2 weeks)
  const generateInspectionDates = (days: string[]): string[] => {
    if (!days || days.length === 0) return [];

    const dayMap: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const dates: string[] = [];
    const today = new Date();

    // Generate dates for the next 14 days that match selected days
    for (let i = 1; i <= 14 && dates.length < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = Object.keys(dayMap).find(
        (key) => dayMap[key] === date.getDay(),
      );

      if (dayName && days.includes(dayName)) {
        date.setHours(10, 0, 0, 0); // Default to 10 AM
        dates.push(date.toISOString());
      }
    }

    return dates;
  };

  const handlePublish = async () => {
    setIsSubmitting(true);

    try {
      const payload = {
        property: {
          propertyTypeId: getPropertyTypeId(formData.propertyType),
          address: formData.address,
          city: formData.neighborhood, // neighborhood maps to city
          state: formData.state,
          country: "Nigeria",
          bedrooms: Number(formData.beds) || 0,
          bathrooms: Number(formData.baths) || 0,
          squareMeters: Number(formData.sqm) || 0,
          description:
            formData.description ||
            `${formData.title} - A beautiful property in ${formData.neighborhood}, ${formData.state}`,
          imageUrls: [], // TODO: Implement media upload
          features: [], // TODO: Add features selection to form
        },
        listing: {
          type: mapOfferType(formData.offerType),
          price: Number(formData.price.replace(/,/g, "")) || 0,
          listingPeriod: "yearly", // API only accepts: daily, weekly, monthly, yearly
          meetingPoint: formData.meetingPoint || "To be confirmed",
          inspectionDates: generateInspectionDates(formData.availableDays),
        },
      };

      await listingService.createListing(payload as any);

      toast.success("Property listed successfully!");
      onClose();
    } catch (error: any) {
      console.error("Failed to create listing:", error);
      toast.error(
        error.message || "Failed to create listing. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-50 dark:bg-slate-900 h-full flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="z-10 p-6 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Add New Property
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Complete the steps below to list a new property.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden md:block">
                Save as Draft
              </button>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500 mt-1.5">
              <span
                className={
                  currentStep >= 1 ? "text-purple-600 dark:text-purple-400" : ""
                }
              >
                Basic Information
              </span>
              <span
                className={
                  currentStep >= 2 ? "text-purple-600 dark:text-purple-400" : ""
                }
              >
                Property Details
              </span>
              <span
                className={
                  currentStep >= 3 ? "text-purple-600 dark:text-purple-400" : ""
                }
              >
                Inspections
              </span>
              <span
                className={
                  currentStep >= 4 ? "text-purple-600 dark:text-purple-400" : ""
                }
              >
                Media
              </span>
              <span
                className={
                  currentStep >= 5 ? "text-purple-600 dark:text-purple-400" : ""
                }
              >
                Publish
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                <Edit3 className="w-5 h-5 text-purple-500" />
                Basic Information
              </h3>
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  htmlFor="title"
                >
                  Property Title <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                  id="title"
                  placeholder="e.g. Modern 3-Bedroom Duplex"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="offerType"
                  >
                    Offer Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10"
                    id="offerType"
                    value={formData.offerType}
                    onChange={handleInputChange}
                  >
                    <option value="rent">For Rent</option>
                    <option value="sale">For Sale</option>
                    <option value="shortlet">Short Let</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="propertyType"
                  >
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10 text-slate-900 dark:text-white"
                    id="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="duplex">Duplex</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="bungalow">Bungalow</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="price"
                  >
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select
                      className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 border-r-0 rounded-l-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-2 outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10 text-slate-900 dark:text-white"
                      id="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                    >
                      <option value="₦">₦</option>
                      <option value="$">$</option>
                    </select>
                    <input
                      className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-r-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                      id="price"
                      placeholder="3,500,000"
                      type="text"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  htmlFor="address"
                >
                  Location / Address <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                  id="address"
                  placeholder="Enter street address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="state"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10"
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja (FCT)</option>
                    <option value="Rivers">Rivers</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="neighborhood"
                  >
                    Neighborhood <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10"
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Neighborhood</option>
                    <option value="Ikoyi">Ikoyi</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Maitama">Maitama</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                Property Details
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="beds"
                  >
                    Bedrooms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="beds"
                    value={formData.beds}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="baths"
                  >
                    Bathrooms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="baths"
                    value={formData.baths}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="sqm"
                  >
                    Size (sqm)
                  </label>
                  <input
                    type="number"
                    id="sqm"
                    value={formData.sqm}
                    onChange={handleInputChange}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe the key features and selling points..."
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Inspections */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-500" />
                Inspection Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="meetingPoint"
                  >
                    Meeting Point <span className="text-red-500">*</span>
                  </label>

                  {isLoadingPoints ? (
                    <div className="flex items-center gap-2 text-slate-500 text-sm py-2.5 px-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-transparent">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
                      <span>Loading inspection points...</span>
                    </div>
                  ) : pointsError ? (
                    <div className="flex items-center justify-between text-red-500 text-sm py-2 px-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800">
                      <span>{pointsError}</span>
                      <button
                        onClick={fetchInspectionPoints}
                        className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                        type="button"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <select
                      id="meetingPoint"
                      value={formData.meetingPoint}
                      onChange={handleInputChange}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10"
                    >
                      <option value="">Select a meeting point</option>
                      {inspectionPoints.map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Available Days for Inspections{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-slate-300 dark:border-slate-700 rounded-2xl p-4 bg-white dark:bg-slate-800">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <label
                          key={day}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              formData.availableDays?.includes(day)
                                ? "bg-purple-500 border-purple-500"
                                : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 group-hover:border-purple-400"
                            }`}
                          >
                            {formData.availableDays?.includes(day) && (
                              <CheckCircle className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formData.availableDays?.includes(day)}
                            onChange={() => handleDayToggle(day)}
                          />
                          <span
                            className={`text-sm ${
                              formData.availableDays?.includes(day)
                                ? "text-purple-700 dark:text-purple-300 font-medium"
                                : "text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {day}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                    <span className="text-lg">💡</span> Clients will coordinate
                    exact times with you directly
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Media */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-purple-500" />
                Media Upload
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Property Images <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Upload at least 3 images (max 20). First image will be the
                  cover photo.
                </p>
                <div className="flex items-center justify-center w-full">
                  <label
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-2xl cursor-pointer bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    htmlFor="dropzone-file"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                      <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mb-2" />
                      <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      className="hidden"
                      id="dropzone-file"
                      multiple
                      type="file"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Publish */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                Review & Publish
              </h3>

              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-800">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    Enable Referrals
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Allow other agents to find clients.{" "}
                    <span className="text-purple-600 dark:text-purple-400 font-medium">
                      Referral agents receive a 40% commission split.
                    </span>
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.referralEnabled}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        referralEnabled: e.target.checked,
                      }))
                    }
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="aspect-video bg-slate-100 dark:bg-slate-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    Cover Image Preview
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-2xl text-sm font-bold text-slate-800">
                    {formData.currency}
                    {formData.price}/year
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                    {formData.title || "Untitled Property"}
                  </h4>
                  <p className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {formData.address},{" "}
                    {formData.neighborhood}
                  </p>
                  <div className="grid grid-cols-3 gap-4 py-4 mt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="text-center">
                      <span className="block font-bold text-slate-800 dark:text-white">
                        {formData.beds || 0}
                      </span>
                      <span className="text-xs text-slate-500">Beds</span>
                    </div>
                    <div className="text-center border-l border-slate-100 dark:border-slate-700">
                      <span className="block font-bold text-slate-800 dark:text-white">
                        {formData.baths || 0}
                      </span>
                      <span className="text-xs text-slate-500">Baths</span>
                    </div>
                    <div className="text-center border-l border-slate-100 dark:border-slate-700">
                      <span className="block font-bold text-slate-800 dark:text-white">
                        {formData.sqm || 0}
                      </span>
                      <span className="text-xs text-slate-500">Sqm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="z-10 p-6 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 transition-all">
          <div className="flex justify-end gap-4">
            <button
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              onClick={currentStep === 1 ? onClose : prevStep}
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>

            {!isLastStep ? (
              <button
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg shadow-purple-500/30 hover:opacity-90 transition-opacity"
                onClick={nextStep}
              >
                Next:{" "}
                {currentStep === 1
                  ? "Property Details"
                  : currentStep === 2
                    ? "Inspections"
                    : currentStep === 3
                      ? "Media"
                      : "Publish"}
              </button>
            ) : (
              <button
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={handlePublish}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Listing"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
