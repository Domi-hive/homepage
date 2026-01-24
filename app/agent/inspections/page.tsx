"use client";

import { useState, Suspense } from "react";
import {
  Bell,
  MessageSquare,
  ChevronDown,
  PlayCircle,
  Star,
  MapPin,
  Navigation,
  Phone,
  Ban,
  Info,
  Hourglass,
  CheckCircle,
  MinusCircle,
  XCircle,
  ChevronRight,
  AlertTriangle,
  ChevronLeft,
  Clock,
} from "lucide-react";
import InspectionDetailsModal from "./InspectionDetailsModal";
import OutcomeSelectionModal from "./OutcomeSelectionModal";
import CancellationModal from "./CancellationModal";
import ClientHeader from "@/components/client/ClientHeader";
import UpcomingInspectionCard from "@/components/client/inspections/UpcomingInspectionCard";
import InspectionRow from "@/components/agent/inspections/inspection-row";
import PropertyModal from "@/components/client/responses/PropertyModal";

import { useSearchParams } from "next/navigation";

function InspectionsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  let initialTab: "today" | "upcoming" | "completed" = "today";
  if (tabParam === "upcoming") initialTab = "upcoming";
  if (tabParam === "completed") initialTab = "completed";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [outcomeModalStep, setOutcomeModalStep] =
    useState<"selection">("selection");
  const [selectedInspection, setSelectedInspection] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "today" | "upcoming" | "completed"
  >(initialTab);
  const [historyPage, setHistoryPage] = useState(1);
  const [arrivedInspections, setArrivedInspections] = useState<number[]>([]); // Track IDs of arrived inspections
  const [expandedProperties, setExpandedProperties] = useState<number[]>([]); // Track IDs of expanded property lists
  const ITEMS_PER_PAGE = 10;

  const toggleProperties = (id: number) => {
    setExpandedProperties((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Mock Data
  const [activeInspections, setActiveInspections] = useState<any[]>([
    {
      id: 101,
      clientName: "Michael Okon",
      clientImage: null,
      propertiesCount: 2,
      price: "10,000",
      rating: 4.7,
      meetingPoint: "Lekki Phase 1 Gate",
      meetingTime: "09:00 AM", // Just for display if needed
      location: "Lekki Phase 1",
      status: "active",
      properties: [
        {
          id: "p1",
          title: "5 Bedroom Mansion",
          location: "Banana Island, Ikoyi",
          price: "₦850M",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDj9qGZ6OJkdzJGn25j5vS4H6J-eGZjBwn2FzPVAeZ-6pZywflJOZjKzXqQHkEqyMBIlEsYsqgiC6ZDt6VPorTE3jklhQB5Y3KGuTempJ5sRjSZGGCxM93hqkO0oINzn0nN05TsLMzG41OUd20x6WcTWt0lb09C10RIb9bk8Ewgjz4ig97tHQKv2KoudkMKkyPIqkeW6gZSLt4xC7PKvAG89CWL4n-Jo9OXhbVGpl35PYTJyN-QyoV29XjAbgoYi9i33Gzc-VVL_w",
        },
        {
          id: "p2",
          title: "4 Bedroom Terrace",
          location: "Lekki Phase 1",
          price: "₦120M",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC_5-lT_b6Ncbw9Q6jBfG7lV8p9Xm9G4b5q1r6D8e9Fs0t1u3v5y7Kx2o4L9a0c3M8g5h7i9k2d4n6p8q0s1t3u5v7x9y1z3a5b7c9d1e3f5g7h9i1j3k5l7m9n1o3p5q7r9s1u3v5w7x9y1z",
        },
      ],
    },
    {
      id: 102,
      clientName: "Sarah Smith",
      clientImage: "/placeholder.svg",
      propertiesCount: 1,
      price: "5,000",
      rating: 4.9,
      meetingPoint: "Shoprite Entrance",
      meetingTime: "11:30 AM",
      location: "Ikeja City Mall",
      status: "active",
      properties: [
        {
          id: "p3",
          title: "3 Bedroom Apartment",
          location: "Ikeja GRA",
          price: "₦5M/yr",
          image: null,
        },
      ],
    },
  ]);

  const [completedItems, setCompletedItems] = useState([
    {
      id: 1,
      icon: Hourglass,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
      title: "2 properties in Ajah",
      subtitle: "Pending client confirmation • Sarah Smith",
      status: "pending_client_update",
      isRated: false,
    },
    {
      id: 2,
      icon: CheckCircle,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      title: "1 property in Victoria Island",
      subtitle: "Completed on 23 Nov 2025 • Tunde Bakare",
      status: "completed",
      isRated: false,
    },
    {
      id: 3,
      icon: MinusCircle,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      title: "1 property in Magodo",
      subtitle: "No-show on 21 Nov 2025 • Grace Obi",
      status: "no-show",
      isRated: false,
    },
    {
      id: 4,
      icon: XCircle,
      iconColor: "text-slate-600",
      iconBg: "bg-slate-200",
      title: "1 property in Lekki Phase 1",
      subtitle: "Cancelled on 19 Nov 2025 • David Eze",
      status: "cancelled",
      isRated: false,
    },
    // ... more items if needed for pagination test
  ]);

  const totalHistoryPages = Math.ceil(completedItems.length / ITEMS_PER_PAGE);
  const startHistoryIndex = (historyPage - 1) * ITEMS_PER_PAGE;
  const currentCompletedItems = completedItems.slice(
    startHistoryIndex,
    startHistoryIndex + ITEMS_PER_PAGE,
  );

  const handleHistoryPageChange = (page: number) => {
    if (page >= 1 && page <= totalHistoryPages) {
      setHistoryPage(page);
    }
  };

  const handleViewInspection = (inspection: any) => {
    setSelectedInspection(inspection);
    setIsModalOpen(true);
  };

  const handleArrive = (id: number) => {
    setArrivedInspections((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleInitiateCompletion = (inspection: any) => {
    setSelectedInspection(inspection); // Set selected so modal knows which one
    setOutcomeModalStep("selection");
    setIsOutcomeModalOpen(true);
  };

  const handleViewProperty = (property: any) => {
    setSelectedProperty(property);
    setIsPropertyModalOpen(true);
  };

  const handleConfirmCompletion = (outcome: any, details: any) => {
    if (!selectedInspection) return;

    // Remove from Active
    setActiveInspections((prev) =>
      prev.filter((i) => i.id !== selectedInspection.id),
    );

    // Add to Completed as Pending Client Update
    const newItem = {
      id: selectedInspection.id,
      icon: Hourglass,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
      title: `${selectedInspection.propertiesCount} propert${selectedInspection.propertiesCount > 1 ? "ies" : "y"} in ${selectedInspection.location}`,
      subtitle: `Pending client confirmation • ${selectedInspection.clientName}`,
      status: "pending_client_update",
      isRated: false,
    };

    setCompletedItems((prev) => [newItem, ...prev]);
    setIsOutcomeModalOpen(false);
    setSelectedInspection(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff7ed] to-[#e3eeff]">
      <div
        className="absolute inset-0 bg-cover bg-top opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: "url(/assets/full_page_background.png)" }}
      />

      <div className="relative z-10 p-4 md:p-10 h-full overflow-y-auto">
        <ClientHeader
          title="My Inspections"
          subtitle="Manage and track all your property inspections"
        />

        <div className="space-y-8">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-700/80 bg-white/30 backdrop-blur-sm p-1 rounded-t-2xl px-4">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-3 font-medium transition-colors relative ${
                activeTab === "today"
                  ? "text-slate-800 dark:text-slate-100 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Today
              {activeTab === "today" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-3 font-medium transition-colors relative ${
                activeTab === "upcoming"
                  ? "text-slate-800 dark:text-slate-100 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Upcoming
              {activeTab === "upcoming" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-3 font-medium transition-colors relative ${
                activeTab === "completed"
                  ? "text-slate-800 dark:text-slate-100 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Completed
              {activeTab === "completed" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full" />
              )}
            </button>
          </div>

          {activeTab === "today" && (
            <div className="flex flex-col gap-4 w-full">
              {activeInspections.length === 0 ? (
                <div className="text-center py-12 bg-white/40 rounded-3xl border border-white/50">
                  <p className="text-slate-500">
                    No inspections scheduled for today.
                  </p>
                </div>
              ) : (
                activeInspections.map((inspection) => (
                  <InspectionRow
                    key={inspection.id}
                    inspection={inspection}
                    isArrived={arrivedInspections.includes(inspection.id)}
                    onArrive={handleArrive}
                    onComplete={handleInitiateCompletion}
                    onViewProperty={handleViewProperty}
                  />
                ))
              )}

              <div className="mt-4 bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">
                  Remember to click <strong>"I've Arrived"</strong> when you
                  reach the meeting point for safety tracking.
                </p>
              </div>
            </div>
          )}

          {activeTab === "completed" && (
            /* Completed / History */
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-6 px-2">
                Past Inspections ({completedItems.length})
              </h3>
              <div className="space-y-4">
                {currentCompletedItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleViewInspection(item)}
                    className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}
                      >
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg">
                          {item.title}
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end md:self-auto">
                      {item.status === "pending_client_update" && (
                        <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-bold border border-amber-200">
                          Pending Client
                        </div>
                      )}
                      {item.status === "completed" && (
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold border border-green-200">
                          Completed
                        </div>
                      )}

                      <div className="flex items-center gap-1 font-bold text-purple-600 transition-opacity">
                        <span>View</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalHistoryPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleHistoryPageChange(historyPage - 1)}
                    disabled={historyPage === 1}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from(
                    { length: totalHistoryPages },
                    (_, i) => i + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handleHistoryPageChange(page)}
                      className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors ${
                        historyPage === page
                          ? "bg-blue-500 text-white shadow"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handleHistoryPageChange(historyPage + 1)}
                    disabled={historyPage === totalHistoryPages}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "upcoming" && (
            <div className="space-y-6">
              <UpcomingInspectionCard
                date={{
                  month: "TOM",
                  day: "28",
                  time: "1:12 PM",
                  bgColor: "bg-purple-50",
                  textColor: "text-purple-600",
                }}
                title="5 Bedroom Mansion..."
                subtitle="Banana Island, Ikoyi"
                agent={{
                  name: "Michael Okon",
                  role: "Inspection Agent",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuA_0gdiH5WNZ2CM5STyMan2DM5JisTrb-KMc_hmwX21lhKDqoSq0sCL7ON3ubReHpQiBHnZTncExjv1KEAXvx9du4xqAy54Tp6PRHA6sdGSE47Y2cYG3U8-n5I01Q-atMIhZOUKK22uAHiw8hv0WO1DdUurC80KNz7zULVXf4eCxZYbyJc6tz3ayl_DOaFQysoShZ-B0lkcHe-kDQnimfjt5eVrMsPrqEtqhMOWVqGcfbeUVSRP9rzxPnetcWsMBP5zapwAtxPiZw",
                }}
              />
              <UpcomingInspectionCard
                date={{
                  month: "DEC",
                  day: "02",
                  time: "11:12 AM",
                  bgColor: "bg-blue-50",
                  textColor: "text-blue-600",
                }}
                title="Multi-Property Inspection"
                subtitle="2 Properties at Yaba"
                agent={{
                  name: "Adaeze Nwankwo",
                  role: "Inspection Agent",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBM2KB9OGpahiA1kLG-oi7Q3fTaL6vsTNFyBJLMy1vRcttzHjDUL8_WZvG8gtSWYpdbXEnMf2F07voqCNAIakBXYwX1-Ee-7zFk2PrsSrajNZRm1hes1X8gwYzQ2V05ouCPMVMgd8jojVQp-yPVH063dww0WA7_HGkZM59stXco_Z6Bmqmn6oWmCdii6C31ZyvA5TeTVdeEadmubItQR-ePKaGpzDpTLFc3Z-FJSlE9ninB7ygX8k4XN6SNLErCnCu0Qj6IXrzt6Q",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <InspectionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inspection={selectedInspection}
      />

      <OutcomeSelectionModal
        isOpen={isOutcomeModalOpen}
        onClose={() => setIsOutcomeModalOpen(false)}
        initialStep={outcomeModalStep}
        onSubmit={handleConfirmCompletion}
      />

      <CancellationModal
        isOpen={isCancellationModalOpen}
        onClose={() => setIsCancellationModalOpen(false)}
        onSubmit={(details) => {
          console.log("Cancellation submitted:", details);
          setIsCancellationModalOpen(false);
          // Handle cancellation submission
        }}
      />

      {selectedProperty && (
        <PropertyModal
          isOpen={isPropertyModalOpen}
          onClose={() => setIsPropertyModalOpen(false)}
          property={{
            id: selectedProperty.id,
            title: selectedProperty.title,
            image: selectedProperty.image || "/placeholder.svg",
            location: selectedProperty.location,
            price: selectedProperty.price,
            bedrooms: 0, // Mock data
            bathrooms: 0, // Mock data
            sqft: "N/A", // Mock data
            qas: 0,
            description: "No description available.", // Mock data
            amenities: [], // Mock data
          }}
        />
      )}
    </div>
  );
}

export default function InspectionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InspectionsContent />
    </Suspense>
  );
}
