"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ChevronDown,
  MessageCircle,
  X,
  Bell,
  Loader2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AgentSidebar from "@/components/client/responses/AgentSidebar";
import AgentInfoCard from "@/components/client/responses/AgentInfoCard";
import PropertyCard from "@/components/client/responses/PropertyCard";
import PropertyModal from "@/components/client/responses/PropertyModal";
import ScheduleInspectionDrawer from "@/components/client/responses/ScheduleInspectionDrawer";
import RecommendedPropertiesTab from "@/components/client/responses/RecommendedPropertiesTab";
import { requestService } from "@/services/request.service";

// ... (imports)

interface Agent {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviews: number;
  specialty: string;
  respondedAt: string;
  propertyCount: number;
  qas: number;
}

interface Property {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number | string;
  bedrooms: number;
  bathrooms: number;
  sqft: number | string;
  qas: number;
  description: string;
  amenities: string[];
}

export default function ResponsesPage() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [activeTab, setActiveTab] = useState<"responses" | "recommendations">(
    "responses",
  );
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recommendationFavorites, setRecommendationFavorites] = useState<
    Set<number>
  >(new Set());
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [showQADrawer, setShowQADrawer] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [properties, setProperties] = useState<Record<string, Property[]>>({});
  const [loading, setLoading] = useState(true);
  const [requestDetails, setRequestDetails] = useState<any>(null);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.id) return;

      try {
        setLoading(true);
        const [requestData, responseData] = await Promise.all([
          requestService.getRequest(params.id as string),
          requestService.getRequestResponses(params.id as string),
        ]);

        setRequestDetails(requestData);

        const newAgents: Agent[] = [];
        const newProperties: Record<string, Property[]> = {};

        responseData.forEach((res: any) => {
          const agent = res.agent;
          // Handle potential data structure variations
          const listings = res.listing || res.listings || [];

          // Handle agent name construction safely
          const firstName =
            agent?.firstName || agent?.user?.firstName || "Unknown";
          const lastName = agent?.lastName || agent?.user?.lastName || "Agent";
          const agentName = `${firstName} ${lastName}`.trim();

          if (!newAgents.find((a) => a.id === agent.id)) {
            newAgents.push({
              id: agent.id,
              name: agentName,
              photo:
                agent.profileImage ||
                agent?.user?.profileImage ||
                "/placeholder.svg",
              rating: agent.rating || 5,
              reviews: agent.reviewCount || 0,
              specialty: "Real Estate Agent",
              respondedAt: new Date(res.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              propertyCount: listings.length,
              qas: 0,
            });
          }

          newProperties[agent.id] = listings.map((listing: any) => ({
            id: listing.id,
            title: listing.name || listing.title || "Untitled Property",
            image: listing.images?.[0] || listing.image || "/placeholder.svg",
            location:
              listing.location ||
              `${listing.lga || ""}, ${listing.state || ""}`.replace(
                /^, /,
                "",
              ) ||
              "Location not specified",
            price: listing.price,
            bedrooms: listing.bedrooms || 0,
            bathrooms: listing.bathrooms || 0,
            sqft: listing.sqft || 0,
            qas: 0,
            description: listing.description || "",
            amenities: listing.amenities || [],
          }));
        });

        setAgents(newAgents);
        setProperties(newProperties);
        if (newAgents.length > 0) {
          setSelectedAgentId(newAgents[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params?.id]);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId);
  const selectedProperties = properties[selectedAgentId] || [];

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const toggleRecommendationFavorite = (id: number) => {
    const newFavorites = new Set(recommendationFavorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setRecommendationFavorites(newFavorites);
  };

  const handleExpressInterest = (propertyTitle: string) => {
    console.log(`Expressed interest in: ${propertyTitle}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff7ed] to-[#e3eeff]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: "url(/assets/full_page_background.png)" }}
      />

      <main className="relative z-10 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-10 pt-8 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/client/requests"
              className="w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-slate-600 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {requestDetails?.bedrooms || "?"} bed{" "}
                {requestDetails?.propertyType || "Property"} in{" "}
                {requestDetails?.location || "Unspecified Location"}
              </h1>
              <p className="text-sm text-slate-500">
                Budget: {requestDetails?.budgetRange || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 self-end md:self-auto">
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/client/activity"
                className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6" />
              </Link>
              <ThemeToggle />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/client/profile">
                <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors">
                  <User className="w-6 h-6 fill-current" />
                </div>
              </Link>
              <div className="hidden md:flex flex-col">
                <div className="text-base font-semibold text-slate-900 leading-6">
                  User
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-10 mb-6">
          <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setActiveTab("responses")}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === "responses"
                  ? "text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Responses
            </button>
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === "recommendations"
                  ? "text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Recommendations
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
          </div>
        ) : activeTab === "responses" ? (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar List */}
            <div className="hidden md:block h-full overflow-y-auto border-r border-slate-200/60 dark:border-slate-700/60 bg-white/30 backdrop-blur-sm p-6 w-[22rem]">
              <AgentSidebar
                agents={agents}
                selectedAgentId={selectedAgentId}
                onSelectAgent={setSelectedAgentId}
              />
            </div>

            {/* Mobile Agent Dropdown */}
            <div className="md:hidden px-4 pb-4">
              <div className="relative">
                <button
                  onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-white/50 bg-white/60 backdrop-blur-sm text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedAgent?.photo || "/placeholder.svg"}
                      alt={selectedAgent?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="font-medium text-sm">
                        {selectedAgent?.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        ⭐ {selectedAgent?.rating}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-slate-500" />
                </button>

                {showAgentDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 border border-white/50 rounded-lg bg-white/90 backdrop-blur-md shadow-lg z-50 overflow-hidden">
                    {agents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => {
                          setSelectedAgentId(agent.id);
                          setShowAgentDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 last:border-b-0 transition-colors ${
                          selectedAgentId === agent.id
                            ? "bg-purple-50 text-purple-700"
                            : "text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={agent.photo || "/placeholder.svg"}
                            alt={agent.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div className="text-left">
                            <div className="font-medium text-sm">
                              {agent.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              ⭐ {agent.rating}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
              {agents.length === 0 ? (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center space-y-4 px-6">
                  <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center shadow-sm">
                    <MessageCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      No responses yet
                    </h3>
                    <p className="text-slate-500 max-w-sm mx-auto mt-1">
                      Agents haven't responded to your request yet. Check out
                      our recommended properties in the meantime!
                    </p>
                  </div>
                  <Button
                    onClick={() => setActiveTab("recommendations")}
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30"
                  >
                    View Recommendations
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedAgent && (
                    <AgentInfoCard
                      agent={selectedAgent}
                      onScheduleInspection={() => setIsScheduleModalOpen(true)}
                    />
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {selectedProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={favorites.has(property.id)}
                        onToggleFavorite={toggleFavorite}
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowQADrawer(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-10 pb-10">
            <RecommendedPropertiesTab
              favorites={recommendationFavorites}
              toggleFavorite={toggleRecommendationFavorite}
              onExpressInterest={handleExpressInterest}
            />
          </div>
        )}
      </main>

      <PropertyModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      {selectedAgent && (
        <ScheduleInspectionDrawer
          show={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          agent={selectedAgent}
          properties={selectedProperties}
        />
      )}
    </div>
  );
}
