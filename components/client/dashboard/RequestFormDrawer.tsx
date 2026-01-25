"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";
import { requestService } from "@/services/request.service";
import { propertyService } from "@/services/property.service";
import { PropertyType } from "@/types/api";

// Fallback options while loading or if error
const FALLBACK_PROPERTY_TYPES = [
  { id: "detached", label: "Detached", icon: "home" },
  { id: "semi-detached", label: "Semi-detached", icon: "home" },
  { id: "terraced", label: "Terraced", icon: "holiday_village" },
  { id: "bungalow", label: "Bungalow", icon: "bungalow" },
  { id: "flats", label: "Flats / apartments", icon: "apartment" },
  { id: "farms", label: "Land", icon: "grass" },
];

const BUDGET_MIN = 0;
const BUDGET_MAX = 10_000_000;
const BUDGET_STEP = 100_000;

const bedroomOptions = [
  { value: "", label: "Any" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4+" },
];

const bathroomOptions = [
  { value: "", label: "Any" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4+" },
];

const offerTypeOptions = [
  { value: "", label: "Any" },
  { value: "buy", label: "For Sale" },
  { value: "rent", label: "For Rent" },
  { value: "shortlet", label: "Short Let" },
];

interface RequestFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RequestFormDrawer({
  isOpen,
  onClose,
  onSuccess,
}: RequestFormDrawerProps) {
  const [location, setLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState({
    min: BUDGET_MIN,
    max: BUDGET_MAX,
  });
  const [bedrooms, setBedrooms] = useState<string | number>("");
  const [bathrooms, setBathrooms] = useState<string | number>("");
  const [offerType, setOfferType] = useState("");
  const [details, setDetails] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      setIsLoadingTypes(true);
      try {
        const types = await propertyService.getPropertyTypes();
        setPropertyTypes(types);
      } catch (err) {
        // console.warn('Failed to fetch property types, using fallback', err);
        setPropertyTypes(FALLBACK_PROPERTY_TYPES);
      } finally {
        setIsLoadingTypes(false);
      }
    };
    fetchTypes();
  }, []);

  // Helper to get options to display
  const displayOptions =
    propertyTypes.length > 0 ? propertyTypes : FALLBACK_PROPERTY_TYPES;

  // Helper to get icon (since API might not return it)
  const getIcon = (id: string) => {
    // Try to match by ID strictly first
    const match = FALLBACK_PROPERTY_TYPES.find((t) => t.id === id);
    if (match) return match.icon;

    // Heuristic matching
    const lowerId = id.toLowerCase();
    if (lowerId.includes("flat") || lowerId.includes("apartment"))
      return "apartment";
    if (lowerId.includes("land") || lowerId.includes("farm")) return "grass";
    if (lowerId.includes("holiday") || lowerId.includes("terrace"))
      return "holiday_village";
    if (lowerId.includes("bungalow")) return "bungalow";

    return "home";
  };

  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mock state for the "1 of 3 locations selected" UI from reference
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small timeout to ensure component is mounted and DOM is ready for transition
      const timer = setTimeout(() => {
        setShow(true);
        document.body.style.overflow = "hidden";
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "unset";
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const formatBudget = (value: number) => {
    if (value >= BUDGET_MAX) return "₦10,000,000+";
    return currencyFormatter.format(value);
  };

  const handleBudgetChange =
    (type: "min" | "max") => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setBudgetRange((prev) => {
        if (type === "min") {
          return { ...prev, min: Math.min(value, prev.max) };
        }
        return { ...prev, max: Math.max(value, prev.min) };
      });
    };

  const togglePropertyType = (id: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddLocation = () => {
    if (
      location &&
      !selectedLocations.includes(location) &&
      selectedLocations.length < 3
    ) {
      setSelectedLocations([...selectedLocations, location]);
      setLocation("");
    }
  };

  const removeLocation = (loc: string) => {
    setSelectedLocations(selectedLocations.filter((l) => l !== loc));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // const formattedBudgetRange = `₦${budgetRange.min.toLocaleString()} - ₦${budgetRange.max.toLocaleString()}`;
      // const propertyTypeString = Array.from(selectedTypes)
      //     .map(id => displayOptions.find(opt => opt.id === id)?.label)
      //     .filter(Boolean)
      //     .join(', ');

      // // Use selectedLocations if available, otherwise check if user typed one but didn't add it
      // const finalLocations = selectedLocations.length > 0 ? selectedLocations : (location ? [location] : []);
      // const locationString = finalLocations.join(', ');

      if (
        /* !locationString || !propertyTypeString || */ bedrooms === "" ||
        !offerType
      ) {
        throw new Error("Please fill in all required fields.");
      }

      // Note: Manual token check removed as API client handles Auth header,
      // but we can leave a check if we want immediate feedback.
      if (!localStorage.getItem("authToken")) {
        throw new Error("You must be logged in to create a request.");
      }

      // Temporary payload for testing
      const testPayload = {
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        cities:
          selectedLocations.length > 0
            ? selectedLocations
            : location
              ? [location]
              : [],
        state: "Lagos",
        minPrice: budgetRange.min,
        maxPrice: budgetRange.max,
      };

      await requestService.createPropertyRequest(testPayload as any);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onSuccess) onSuccess();
        // Reset form
        setLocation("");
        setSelectedLocations([]);
        setBudgetRange({ min: BUDGET_MIN, max: BUDGET_MAX });
        setBedrooms("");
        setBathrooms("");
        setOfferType("");
        setDetails("");
        setSelectedTypes(new Set());
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  if (!isVisible && !isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex justify-end ${show ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 h-[100dvh] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${show ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full md:max-w-lg bg-slate-50 dark:bg-[#1a1829] h-[100dvh] flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${show ? "translate-x-0 delay-100" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50/80 dark:bg-[#1a1829]/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Create Property Request
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Specify your property needs to find the perfect match.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Request Created!
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Your property request has been successfully submitted.
              </p>
            </div>
          ) : (
            <form
              id="request-form"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Neighbourhood(s) <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  You can add up to 3 neighbourhoods.
                  {selectedLocations.length < 3 ? (
                    <span className="text-coral ml-1 font-medium">
                      ({3 - selectedLocations.length} remaining)
                    </span>
                  ) : (
                    <span className="text-green-600 ml-1 font-medium">
                      Max reached
                    </span>
                  )}
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <select className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-[#F59E0B] focus:border-[#F59E0B] py-2.5 pl-3 pr-10 text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]">
                      <option>Select State</option>
                      <option>Abia</option>
                      <option>Abuja (FCT)</option>
                      <option>Lagos</option>
                      <option>Rivers</option>
                    </select>
                  </div>
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl">
                        search
                      </span>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddLocation();
                          }
                        }}
                        disabled={selectedLocations.length >= 3}
                        className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-[#F59E0B] focus:border-[#F59E0B] pl-10 p-2.5 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={
                          selectedLocations.length >= 3
                            ? "Max locations added"
                            : "Search neighbourhoods in Lagos"
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddLocation}
                      disabled={!location || selectedLocations.length >= 3}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {selectedLocations.length > 0 && (
                  <div className="pt-3 space-y-2">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {selectedLocations.length} of 3 neighbourhoods selected
                    </p>
                    {selectedLocations.map((loc, index) => (
                      <div
                        key={index}
                        className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-medium px-3 py-2 rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg text-slate-500">
                            location_on
                          </span>
                          <span>{loc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLocation(loc)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            close
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Price range
                </label>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                  <input
                    type="range"
                    min={BUDGET_MIN}
                    max={BUDGET_MAX}
                    step={BUDGET_STEP}
                    value={budgetRange.max}
                    onChange={handleBudgetChange("max")}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-[#F59E0B]"
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <span>{formatBudget(budgetRange.min)}</span>
                    <span>{formatBudget(budgetRange.max)}</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms, Bathrooms & Tenure */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="bedrooms"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    value={bedrooms}
                    onChange={(e) =>
                      setBedrooms(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-[#F59E0B] focus:border-[#F59E0B] py-2.5 pl-3 pr-10 text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]"
                    required
                  >
                    {bedroomOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="bathrooms"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Bathrooms
                  </label>
                  <select
                    id="bathrooms"
                    value={bathrooms}
                    onChange={(e) =>
                      setBathrooms(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-[#F59E0B] focus:border-[#F59E0B] py-2.5 pl-3 pr-10 text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]"
                  >
                    {bathroomOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="offerType"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Offer Type
                  </label>
                  <select
                    id="offerType"
                    value={offerType}
                    onChange={(e) => setOfferType(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-[#F59E0B] focus:border-[#F59E0B] py-2.5 pl-3 pr-10 text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]"
                    required
                  >
                    {offerTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Property Types */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Property types
                </label>
                <div className="flex flex-wrap gap-3">
                  {displayOptions.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => togglePropertyType(type.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedTypes.has(type.id)
                          ? "bg-orange-50 dark:bg-orange-900/30 text-[#D97706] dark:text-[#F59E0B] font-semibold border-2 border-[#F59E0B]"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {getIcon(type.id)}
                      </span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Details */}
              <div className="space-y-2">
                <label
                  htmlFor="specific-details"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Specific details
                </label>
                <textarea
                  id="specific-details"
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-[#F59E0B] focus:border-[#F59E0B] p-3 text-slate-900 dark:text-white placeholder-slate-400"
                  placeholder="Add notes about preferred finishes, timelines, amenities, or accessibility needs."
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="p-6 bg-slate-50/80 dark:bg-[#1a1829]/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              form="request-form"
              disabled={isLoading}
              className="w-full px-5 py-3 text-base font-semibold text-white bg-[#0F172A] rounded-3xl shadow-lg shadow-slate-900/20 hover:bg-[#1E293B] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Request"
              )}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
