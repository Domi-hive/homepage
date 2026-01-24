"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  MessageSquare,
  Bell,
  Filter,
  ChevronUp,
  X,
  Heart,
  ArrowUp,
  Bed,
  Bath,
  Maximize,
  Send,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: number | string;
  title: string;
  price: string;
  location: string;
  image: string;
  beds: number;
  baths: number;
  sqft: string | number;
  matchScore?: number;
  trend?: string;
}

interface MarketplaceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSelection: (selectedProperties: Property[]) => void;
  initialSelectedProperties?: Property[];
}

const MOCK_MARKETPLACE_PROPERTIES: Property[] = [
  {
    id: 101,
    title: "Modern Los Angeles",
    location: "1453 Modern Los Angeles, CA",
    price: "$1,250,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Qgrvr8ctrOuZjcQy9vjk9bVtR3-VJ4WPlJl3DiGmPjio6H1-wUVSXpDBMUl-xmsz1364Zg4QpPyc601WV9QqJH4fmAJwfvIcPitjmmDC8XPx4iZaE8ng7GUzdwBh6GrDHnBv3QoV_LVNfOonXWxhMbtZEcdqpzGz3wS_mj0UZx3q9wbAsl4nysf4OX8yk6baZ86U_EsN6wIEbTv_N1lHWLLKCaMgEG0KxPGA9XdYeb9BGsTMKCMdcc37a7XTSmidZR_WNIhyCQ",
    beds: 4,
    baths: 3.5,
    sqft: "3,200",
    trend: "1.20%",
  },
  {
    id: 102,
    title: "Spanish Colonial Estate",
    location: "6900 Spanish Colonial Estate",
    price: "$3,800,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAXOmHmrkDkNRNYAiAj_rGN9E2Bby_eMxpVJJeP7XTOmbZ2flWBzZmY_gbV5EuPvxOV_6NLVVtHEFayfXAS1yV_IsyLD85I3epqEs82g5Zt5lb01Qqgd8zUjUdsvaUR3eNhnCkBAJ4r0YpYDodTxgB6cUIx7JuXtiCD76aPciK_x6y3pXIbvokD_nAdR6mANhYId_Hk95CofuMf3JOlBNumgtzObH3lp50QXao7xgwVrnV1fk4fRv32OIo75Jf9pB4qFVy8QwcQ",
    beds: 4,
    baths: 3.5,
    sqft: "3,200",
  },
  {
    id: 103,
    title: "Premiury Penthouse",
    location: "1527 Premiury Penthouse",
    price: "$950,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5M9x4F-MC2jn0YvE9J3ZGgE7GY-fsjDV8pQbiM7Ob71tqIMmpRIWQtXtoINVtVtTVAty8PUeJFWnJ7YlJdNg2L2cSbHJ4pw-Uebl3Ya0fcN11PQ-sL4XOUsYAZbcj7lrzd2y_fKBfb86n1NHsiXursDDr_mgRbjueAt6crFj_HTEaVStDnS8HhdZRqnXEuBo09bV2gnodxA7LIixPtpVDUJQ2rPFZ75IQQoA1LJQwJ06HF4sI4mJlPlNw8rlvKS-iRZ1aZOKswg",
    beds: 4,
    baths: 3.5,
    sqft: "1,100",
  },
  {
    id: 104,
    title: "Villa is Beachfront",
    location: "7048 Villa is Beachfront, CA",
    price: "$4,500,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlooifmhhgIVp0bBWUyCpWoLS0oFDQgI6MzWLaoN39gqE76cAW9gwQiCn6iCnBCIAEm-iQjVRrVOo1Tj7N6niG_k8_uWUHMykYYiHn1IBWzd2L01ZudCG_OwXdk0BuTV-X5WWHd5XC53q4TdxUlK6tfutSc9iDYug0POEEy_I2fCpnU9cxyB8PQuzkcmhiRN7v--rXR99EmJav4JavtDbsKPb5IR-Fw1pCRrH1BWAFXcQ-FPZUpXB0fh9q3UzUCjN3mDQdnEI7Cw",
    beds: 4,
    baths: 3.5,
    sqft: "3,200",
    trend: "3.17%",
  },
  {
    id: 105,
    title: "Sprawling Ranch",
    location: "4233 Sprawling Ranch",
    price: "$2,100,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGu4CZfrr2Diy8-LKuZ45-IQma_4Ye82ISWRZ8FxTEVVVZsqOuzPqSNw4sdPkAxX_WxNMao2bsojVWPi-TPa-o-43aX0szbkxcbXlPeGCjXGbyoCpL4rQ7OYVJ62NnROCsMPVqvf1fn9hcHPltJkccSe1mP-LH7GPOGnoq276mWr3zKf4H_cTXBS7lNhn8zrBUPsLbNUARHb1D1d4CU2X9sHeoC0Dqtxze2MiZRBzsCq5M3lvoflXTCxZNzAKVCatOkB45y32rJw",
    beds: 4,
    baths: 3.5,
    sqft: "3,200",
    trend: "2.17%",
  },
  {
    id: 106,
    title: "Historic Brownstone",
    location: "5025 1n Historic Brownstone, NA",
    price: "$1,750,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmv4T9o14NDGqg4FMoToSXJIlsfHmJgVoLs75d-IepZCZuiczbXJppb_LRxRYthbV5j9_SKjktD788vvRBa1Ml4jG6UwnwNvWQrGS-ZU3EKEfwSy1u2YToXuIPo1cQ1Py6-t0xR6Tzv69OUEWHei8TRJfbF9K1GTxBMQ7872MgW4Y9sbty_eR8XN6XSh2Ea5GXH_kyegLAq9NQ12tsvVybk_bX2LhCOwveD8JFGyFHyIY-Ym1c_oTVztIGnxyEtKTLG7_9cCU0kA",
    beds: 4,
    baths: 3.5,
    sqft: "3,200",
    trend: "1.75%",
  },
];

export default function MarketplaceOverlay({
  isOpen,
  onClose,
  onConfirmSelection,
  initialSelectedProperties = [],
  myListings = [],
}: MarketplaceOverlayProps & { myListings?: any[] }) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(
    initialSelectedProperties,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"marketplace" | "my-listings">(
    "my-listings",
  );
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Sync with initial selection when opening
  useEffect(() => {
    if (isOpen) {
      setSelectedProperties(initialSelectedProperties);
    }
  }, [isOpen, initialSelectedProperties]);

  if (!isOpen || !mounted) return null;

  const toggleProperty = (property: Property) => {
    setSelectedProperties((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const handleConfirm = () => {
    onConfirmSelection(selectedProperties);
    onClose();
  };

  const displayedProperties =
    activeTab === "marketplace" ? MOCK_MARKETPLACE_PROPERTIES : myListings;

  const content = (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 md:p-8 z-[100]">
      <div className="w-full max-w-[1440px] h-[90vh] bg-gradient-to-br from-[#fff7ed] to-[#e3eeff] dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-top opacity-10 pointer-events-none z-0 rounded-2xl"
          style={{ backgroundImage: "url(/assets/full_page_background.png)" }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full p-6 gap-6">
          {/* Header */}
          <div className="flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                Select Properties
              </h2>
              <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-700/80">
                <button
                  onClick={() => setActiveTab("my-listings")}
                  className={`px-4 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === "my-listings"
                      ? "text-slate-800 dark:text-slate-100 border-purple-500"
                      : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  My Listings
                </button>
                <button
                  onClick={() => setActiveTab("marketplace")}
                  className={`px-4 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                    activeTab === "marketplace"
                      ? "text-slate-800 dark:text-slate-100 border-purple-500"
                      : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  Marketplace
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-64 md:w-80 hidden md:block">
                <input
                  className="w-full bg-white/60 dark:bg-slate-800/60 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:ring-2 focus:ring-purple-400 border border-slate-200 dark:border-white/10 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 outline-none shadow-[0_2px_8px_0_rgba(100,100,150,0.08)]"
                  placeholder={
                    activeTab === "marketplace"
                      ? "Search marketplace..."
                      : "Search my listings..."
                  }
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/40 flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex gap-6 overflow-hidden">
            {/* Sidebar Filters */}
            {isFilterPanelOpen && (
              <aside className="w-[320px] flex-shrink-0 bg-white/60 dark:bg-slate-900/60 rounded-xl p-6 flex flex-col gap-6 overflow-y-auto shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Advanced Filters
                  </h3>
                  <button className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Reset All
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-slate-600 dark:text-slate-300">
                      Price Range
                    </label>
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  </div>
                  {/* Simple Range Slider Representation */}
                  <div className="relative h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 mb-4">
                    <div className="absolute left-[10%] right-[20%] h-full bg-purple-500 rounded-full"></div>
                    <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-pointer shadow-sm"></div>
                    <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-pointer shadow-sm"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      className="w-1/2 bg-slate-100 dark:bg-slate-700/60 rounded-lg py-2 px-3 text-sm text-center border-transparent focus:ring-2 focus:ring-purple-400 outline-none"
                      type="text"
                      defaultValue="$500K"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      className="w-1/2 bg-slate-100 dark:bg-slate-700/60 rounded-lg py-2 px-3 text-sm text-center border-transparent focus:ring-2 focus:ring-purple-400 outline-none"
                      type="text"
                      defaultValue="$2.5M"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-slate-600 dark:text-slate-300">
                      Location
                    </label>
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="relative">
                    <input
                      className="w-full bg-slate-100 dark:bg-slate-700/60 rounded-lg py-2 pl-9 pr-3 text-sm border-transparent focus:ring-2 focus:ring-purple-400 placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                      placeholder="Search..."
                      type="text"
                    />
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      Los Angeles, CA{" "}
                      <button>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      Beverly Hills{" "}
                      <button>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="font-medium text-slate-600 dark:text-slate-300">
                    Bedrooms
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    <button className="bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">
                      1
                    </button>
                    <button className="bg-purple-500 text-white py-2 rounded-lg text-sm font-medium shadow-md shadow-purple-500/30 transition-colors">
                      2
                    </button>
                    <button className="bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">
                      3
                    </button>
                    <button className="bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">
                      4
                    </button>
                    <button className="bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">
                      5+
                    </button>
                  </div>
                </div>

                <button className="w-full bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm">
                  More Filters
                </button>
              </aside>
            )}

            {/* Main Grid */}
            <main className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
                {displayedProperties.map((property) => {
                  const isSelected = selectedProperties.some(
                    (p) => p.id === property.id,
                  );
                  return (
                    <div
                      key={property.id}
                      className={`bg-white/60 dark:bg-slate-900/60 rounded-xl shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10 overflow-hidden group cursor-pointer transition-all duration-200 ${isSelected ? "ring-2 ring-purple-500" : "hover:shadow-lg"}`}
                      onClick={() => toggleProperty(property)}
                    >
                      <div className="relative">
                        <img
                          alt={property.title}
                          className="w-full h-48 object-cover"
                          src={property.image}
                        />
                        <button className="absolute top-3 right-3 bg-white/30 backdrop-blur-sm p-1.5 rounded-full text-white hover:text-red-500 transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                        {isSelected && (
                          <div className="absolute top-3 left-3 bg-purple-500 text-white p-1 rounded-full shadow-lg">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xl font-bold text-slate-800 dark:text-white">
                              {property.price}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                              {property.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {property.trend && (
                              <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded-full flex items-center">
                                <ArrowUp className="h-3 w-3 mr-0.5" />
                                {property.trend}
                              </span>
                            )}
                            <div
                              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-purple-500 border-purple-500" : "border-slate-300 dark:border-slate-600"}`}
                            >
                              {isSelected && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-4 border-t border-slate-200/80 dark:border-slate-700/80 pt-3">
                          <span className="flex items-center gap-1.5">
                            <Bed className="h-4 w-4" />
                            {property.beds || "-"} Beds
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Bath className="h-4 w-4" />
                            {property.baths || "-"} Baths
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Maximize className="h-4 w-4" />
                            {property.sqft || "-"} sq ft
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>

          {/* Bottom Dock */}
          {selectedProperties.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 duration-300 z-50">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4 pl-2">
                  {selectedProperties.slice(0, 5).map((p, i) => (
                    <img
                      key={p.id}
                      alt={p.title}
                      className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                      src={p.image}
                    />
                  ))}
                  {selectedProperties.length > 5 && (
                    <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                      +{selectedProperties.length - 5}
                    </div>
                  )}
                </div>
                <div className="pr-2">
                  <p className="font-bold text-slate-800 dark:text-white">
                    {selectedProperties.length} Properties
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Selected for response
                  </p>
                </div>
              </div>
              <button
                onClick={handleConfirm}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30"
              >
                <span>Add to Response</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
