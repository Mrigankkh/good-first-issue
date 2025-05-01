import { useEffect, useState } from "react";
import axios from "axios";

import { Issue } from "@/types/issue";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import IssuesGrid from "@/components/IssuesGrid";
import RecommendedIssue from "@/components/RecommendedIssue";
import { getRecommendedIssue } from "@/utils/recommendationEngine";
import SettingsModal from "@/components/settings/SettingModal";

export default function HomePage() {

  const BACKEND_SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchRepo, setSearchRepo] = useState<string>("");
  const [searchOrg, setSearchOrg] = useState<string>("");
  const [showFAANGOnly, setShowFAANGOnly] = useState<boolean>(false);
  const [showOnlyActive, setShowOnlyActive] = useState<boolean>(false);

  const [selectedSort, setSelectedSort] = useState<string>("stars");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const recommendedIssue = getRecommendedIssue(issues);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<string | null>(null);

  const filterProps = {
    searchRepo,
    setSearchRepo,
    searchOrg,
    setSearchOrg,
    showFAANGOnly,
    setShowFAANGOnly,
    showOnlyActive,
    setShowOnlyActive,
    selectedSort,
    setSelectedSort,
    selectedLanguage,
    setSelectedLanguage,
  };

  const languages = Array.from(
    new Set(issues.map((issue) => issue.repository.language).filter(Boolean))
  ).sort();

  const fetchIssues = async () => {
    setLoading(true); // Reset loading spinner
    setError(null); // Clear previous error
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_URL}/api/issues`
      );
      setIssues(response.data.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
      setError("Failed to load issues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchlastUpdatedTimstamp = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_URL}/api/last_updated`
      );
      setLastUpdatedTimestamp(response.data.data);
      console.log("Last Updated Timestamp:", response.data.data);
    } catch (error) {
      console.error("Error fetching last updated timestamp:", error);
      setError("Failed to load last updated timestamp. Please try again later.");
    } 
  };



  useEffect(() => {
    fetchIssues(); // Initial load
    fetchlastUpdatedTimstamp(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <Header updateTimestamp = {lastUpdatedTimestamp} onOpenSettings={() => setIsSettingsOpen(true)} />


      {/* MAIN */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* FILTERS */}
        <FilterBar {...filterProps} languages={languages} />

        {/* CONDITIONAL CONTENT */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <h2 className="text-lg font-semibold text-gray-600">
              Loading Good First Issues...
            </h2>
          </div>
        ) : error || issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <h1 className="text-2xl text-gray-800 font-semibold mb-2">
              😔 No Issues Found
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn't load any issues. Please try refreshing!
            </p>
            <button
              onClick={fetchIssues}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            {/* Recommended Issue Card */}
            <RecommendedIssue issue={recommendedIssue} />

            {/* Issues Grid */}
            <IssuesGrid
              issues={issues}
              selectedLanguage={selectedLanguage}
              searchRepo={searchRepo}
              searchOrg={searchOrg}
              showFAANGOnly={showFAANGOnly}
              showOnlyActive={showOnlyActive}
              selectedSort={selectedSort}
            />
          </>
        )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
