import { useEffect, useState } from "react";
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
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

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
