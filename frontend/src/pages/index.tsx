import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import { Issue } from "@/types/issue";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import IssuesGrid from "@/components/IssuesGrid";
import RecommendedIssue from "@/components/RecommendedIssue";
import { getRecommendedIssue } from "@/utils/recommendationEngine";

// inside HomePage component

export default function HomePage() {
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

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get<Issue[]>(
          "http://localhost:8000/api/issues"
        );
        setIssues(response.data.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setError("Failed to load issues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-semibold mb-2">⚠️ Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* FILTERS */}
        <FilterBar {...filterProps} languages={languages} />

        {/* ISSUES GRID */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <h2 className="text-lg font-semibold text-gray-600">
              Loading Good First Issues...
            </h2>
          </div>
        ) : (
          <>
            <RecommendedIssue issue={recommendedIssue} />

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
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
