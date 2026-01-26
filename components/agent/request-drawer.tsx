"use client";

import {
  X,
  MapPin,
  DollarSign,
  Home,
  Clock,
  Users,
  Search,
  Plus,
  Trash2,
  AlertCircle,
  MessageSquare,
  ExternalLink,
  Loader2,
  RefreshCcw,
  Calendar,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import MarketplaceOverlay from "./marketplace-overlay";
import { requestService } from "@/services/request.service";
import { listingService } from "@/services/listing.service";
import AddPropertyDrawer from "./my-listings/AddPropertyDrawer";

interface RequestDrawerProps {
  request: {
    id: string;
    clientName: string;
    location: string;
    locationDetails?: string;
    budget: string;
    bedrooms: string;
    preferences: string;
    timeline: string;
    timestamp: string;
    priority: "high" | "medium" | "low";
    respondentsCount: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RequestDrawer({
  request,
  isOpen,
  onClose,
  onSuccess,
}: RequestDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"my-listings" | "selected">(
    "my-listings",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [meetingPoint, setMeetingPoint] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [showStaleConfirmation, setShowStaleConfirmation] = useState(false);
  const [isConfirmingStale, setIsConfirmingStale] = useState(false);

  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsAnimating(isOpen);
    if (isOpen) {
      setIsVisible(true);
      // Small timeout to ensure component is mounted and DOM is ready for transition
      const timer = setTimeout(() => {
        setShow(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      // Reset state when closed
      setTimeout(() => {
        setIsVisible(false);
        setSelectedProperties([]);
        setMessage("");
        setActiveTab("my-listings");
        setSearchQuery("");
        setIsMarketplaceOpen(false);
        setCurrentStep(1);
        setMeetingPoint("");
        setAvailableDays([]);
      }, 300);
    }
  }, [isOpen]);

  // Mock Data from ResponseModal
  const [myListings, setMyListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listings = await listingService.getMyListings();
        const formattedListings = listings.map((l) => ({
          id: l.id,
          title: l.title,
          location: l.location,
          price: l.price,
          image: l.image || "/placeholder.svg",
          beds: l.beds,
          baths: l.baths,
          sqft: l.sqft,
          matchScore: undefined,
          agent: "You",
          isOwn: true,
          isStale: l.isStale,
          lastUpdated: l.lastUpdated,
        }));
        setMyListings(formattedListings);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        toast.error("Failed to load your listings");
      }
    };

    if (isOpen) {
      fetchListings();
    }
  }, [isOpen]);

  const getFilteredProperties = (properties: any[]) => {
    return properties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  };

  const filteredMyListings = getFilteredProperties(myListings);

  const fetchListings = async () => {
    try {
      const listings = await listingService.getMyListings();
      const formattedListings = listings.map((l) => ({
        id: l.id,
        title: l.title,
        location: l.location,
        price: l.price,
        image: l.image || "/placeholder.svg",
        beds: l.beds,
        baths: l.baths,
        sqft: l.sqft,
        matchScore: undefined,
        agent: "You",
        isOwn: true,
        isStale: l.isStale,
        lastUpdated: l.lastUpdated,
      }));
      setMyListings(formattedListings);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      toast.error("Failed to load your listings");
    }
  };

  const handleAddListingSuccess = async (newListing: any) => {
    setIsAddListingOpen(false);
    await fetchListings();

    // Auto-select the new listing if possible (we assume format matches or we find it in refreshed list)
    // Since fetchListings is async and we just called it, we might need to rely on the newListing data directly
    // to add it to selection if we want instant feedback, but refreshing list + selecting by ID is safer.
    // For now, let's just toast and refresh. The user can find it at the top of their list (if sorted) or search.
    // If we want to auto-select, we'd need to ensure the ID matches what fetchListings returns.

    // Optimized: Optimistically add to selection if it matches our shape, or wait for fetch.
    toast.success("New listing added and list refreshed!");
  };

  const toggleProperty = (property: any) => {
    setSelectedProperties((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      } else if (prev.length < 5) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeProperty = (propertyId: number | string) => {
    setSelectedProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const handleMarketplaceConfirm = (properties: any[]) => {
    // Merge new properties with existing ones, avoiding duplicates, up to limit of 5
    setSelectedProperties((prev) => {
      const currentIds = new Set(prev.map((p) => p.id));
      const newProperties = properties.filter((p) => !currentIds.has(p.id));
      const combined = [...prev, ...newProperties];
      return combined.slice(0, 5);
    });
    setActiveTab("selected");
  };

  // Generate next 3 days
  const nextThreeDays = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(10, 0, 0, 0); // Default to 10 AM
    return {
      iso: date.toISOString(),
      label:
        i === 0
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "long" }),
      subLabel: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });

  const handleDayToggle = (isoDate: string) => {
    setAvailableDays((prev) => {
      if (prev.includes(isoDate)) {
        return prev.filter((d) => d !== isoDate);
      } else {
        return [...prev, isoDate];
      }
    });
  };

  const submitResponse = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        listingIds: selectedProperties.map((p) => p.id.toString()),
        meetingPoint: meetingPoint,
        inspectionDates: availableDays.sort(), // Send selected ISO dates directly
        message: message,
      };

      await requestService.sendRequestResponse(request.id, payload);

      toast.success(`Response sent to ${request.clientName}!`);

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to send response:", error);
      setError("Failed to send response. Please try again.");
      toast.error("Failed to send response");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmAvailability = async () => {
    setIsConfirmingStale(true);
    try {
      const staleProps = selectedProperties.filter((p) => p.isStale);
      // Update all stale properties to active (which updates timestamp)
      await Promise.all(
        staleProps.map((p) =>
          listingService.updateListingStatus(p.id.toString(), true),
        ),
      );

      // Update local state to reflect changes (optional but good for UI consistency if we fail later)
      setSelectedProperties((prev) =>
        prev.map((p) => {
          if (staleProps.find((sp) => sp.id === p.id)) {
            return { ...p, isStale: false };
          }
          return p;
        }),
      );

      setShowStaleConfirmation(false);
      await submitResponse();
    } catch (error) {
      console.error("Failed to confirm availability:", error);
      toast.error("Failed to update listing status");
    } finally {
      setIsConfirmingStale(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedProperties.length === 0 || !request) return;

    // Check for stale properties
    const hasStaleListings = selectedProperties.some((p) => p.isStale);
    if (hasStaleListings) {
      setShowStaleConfirmation(true);
      return;
    }

    await submitResponse();
  };

  if (!isOpen && !isVisible) return null;

  const PropertyCard = ({
    property,
    canAdd = true,
  }: {
    property: any;
    canAdd?: boolean;
  }) => {
    const isSelected = selectedProperties.find((p) => p.id === property.id);
    const cannotAdd = canAdd && selectedProperties.length >= 5 && !isSelected;

    return (
      <div
        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors group ${
          cannotAdd
            ? "bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed dark:bg-white/5 dark:border-white/5"
            : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
        }`}
        onClick={() => !cannotAdd && toggleProperty(property)}
      >
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="w-16 h-12 rounded-md object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
            {property.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-blue-300 truncate">
            {property.location} • {property.price}
          </p>
        </div>
        <div className="text-right">
          {property.matchScore && (
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {property.matchScore}%
            </p>
          )}
        </div>
        {canAdd && (
          <button
            className={`p-1.5 rounded-md transition-colors ${
              isSelected
                ? "bg-blue-100 text-blue-600 dark:bg-blue-500/30 dark:text-blue-300"
                : "hover:bg-blue-50 text-blue-500 opacity-0 group-hover:opacity-100 dark:hover:bg-blue-500/20 dark:text-blue-400"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!cannotAdd) toggleProperty(property);
            }}
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <MarketplaceOverlay
        isOpen={isMarketplaceOpen}
        onClose={() => setIsMarketplaceOpen(false)}
        onConfirmSelection={handleMarketplaceConfirm}
        initialSelectedProperties={selectedProperties.filter((p) => p.id > 100)} // Assuming marketplace IDs are > 100
        myListings={myListings}
      />

      {/* Stale Listing Confirmation Modal */}
      {showStaleConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                Confirm Availability
              </h3>
              <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
                Some of the listings you selected haven't been updated in over
                24 hours. Please confirm they are still available before
                sending.
              </p>

              <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 max-h-48 overflow-y-auto">
                {selectedProperties
                  .filter((p) => p.isStale)
                  .map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700"
                    >
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">
                          {property.title}
                        </p>
                        <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Last updated:{" "}
                          {property.lastUpdated}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowStaleConfirmation(false)}
                  disabled={isConfirmingStale}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmAvailability}
                  disabled={isConfirmingStale}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {isConfirmingStale ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Confirm & Send"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full md:max-w-lg z-50 bg-[#F7F5FF] dark:bg-[#1a1829] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${show ? "translate-x-0 delay-100" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-lg z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Response
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select properties and send your response
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Response Form */}
          {currentStep === 1 && (
            <div className="flex-1 overflow-y-auto p-6 bg-white/40 dark:bg-black/20">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                Select Properties
              </h3>

              {/* Select Properties Header */}
              <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-blue-300 uppercase tracking-wide">
                  Selected Properties
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-200 dark:border-blue-400/30 h-5 px-1.5 text-[10px]"
                  >
                    {selectedProperties.length}/5
                  </Badge>
                </h3>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddListingOpen(true)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add New Property
                  </Button>
                </div>
              </div>

              {/* Property List */}
              <div className="space-y-3 mb-6 min-h-[200px]">
                {selectedProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500 dark:text-blue-300/60 text-sm mb-3">
                      No properties selected yet
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMarketplaceOpen(true)}
                      className="text-[#0F172A] border-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      Select Properties
                    </Button>
                  </div>
                ) : (
                  selectedProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200 group dark:bg-blue-500/10 dark:border-blue-400/30"
                    >
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-16 h-12 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                          {property.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-blue-300 truncate">
                          {property.location} • {property.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeProperty(property.id)}
                        className="p-1.5 hover:bg-red-100 rounded-md transition-colors opacity-0 group-hover:opacity-100 dark:hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  ))
                )}
                {selectedProperties.length > 0 &&
                  selectedProperties.length < 5 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMarketplaceOpen(true)}
                      className="w-full border-dashed border-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add selection
                    </Button>
                  )}
              </div>

              {/* Message Input */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-blue-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Personal Message
                </h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  placeholder="Introduce yourself and explain why these properties match their needs..."
                  className="w-full h-32 rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-blue-300/50 dark:focus:border-blue-400/50"
                />
                <p className="text-xs text-slate-500 dark:text-blue-300 mt-2 text-right">
                  {message.length}/500
                </p>
              </div>

              {/* Warning if no properties selected */}
              {/* Warning if no properties selected */}
              {selectedProperties.length === 0 && (
                <div className="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3 flex items-start gap-3 dark:bg-yellow-500/10 dark:border-yellow-400/30">
                  <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div></div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex-1 overflow-y-auto p-6 bg-white/40 dark:bg-black/20">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Inspection Details
              </h3>

              <div className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    htmlFor="meetingPoint"
                  >
                    Meeting Point <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="meetingPoint"
                      type="text"
                      value={meetingPoint}
                      onChange={(e) => setMeetingPoint(e.target.value)}
                      placeholder="e.g. Estate Main Gate, Mall Entrance..."
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#0F172A] focus:border-[#0F172A] px-4 py-2 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="mt-2 flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      For safety, please use a well-known public location as the
                      meeting point.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Available Days for Inspections{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-slate-300 dark:border-slate-700 rounded-2xl p-4 bg-white dark:bg-slate-800">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {nextThreeDays.map((day) => (
                        <label
                          key={day.iso}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            availableDays.includes(day.iso)
                              ? "border-[#0F172A] bg-slate-50 dark:bg-slate-800 dark:border-white"
                              : "border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={availableDays.includes(day.iso)}
                            onChange={() => handleDayToggle(day.iso)}
                          />
                          <span
                            className={`text-sm font-semibold mb-1 ${
                              availableDays.includes(day.iso)
                                ? "text-[#0F172A] dark:text-white"
                                : "text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {day.label}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            {day.subLabel}
                          </span>
                          {availableDays.includes(day.iso) && (
                            <div className="mt-2 text-[#0F172A] dark:text-white">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                    <span className="text-lg">💡</span> You will coordinate
                    exact times directly
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-lg">
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep === 2) {
                  setCurrentStep(1);
                } else {
                  onClose();
                }
              }}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:bg-transparent h-11 px-8"
              disabled={isSubmitting}
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            {currentStep === 1 ? (
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={selectedProperties.length === 0}
                className="bg-[#0F172A] hover:opacity-90 text-white font-semibold h-11 px-8 rounded-xl transition-opacity shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Inspection Details
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting || !meetingPoint || availableDays.length === 0
                }
                className="bg-[#0F172A] hover:opacity-90 text-white font-semibold h-11 px-8 rounded-xl transition-opacity shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Response"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <AddPropertyDrawer
        isOpen={isAddListingOpen}
        onClose={() => setIsAddListingOpen(false)}
        onSuccess={handleAddListingSuccess}
        variant="modal"
      />
    </>
  );
}
