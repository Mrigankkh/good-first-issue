import { useEffect, useState } from "react";
import { Issue } from "@/types/issue";
import IssueCard from "@/components/IssueCard";
import { IssuesGridProps } from "@/types/issuesgrid";
import Pagination from "@/components/Pagination";

const PAGE_SIZE_KEY = "goodfirstissues_ipp";

export default function IssuesGrid({
  issues,
  selectedLanguage,
  searchRepo,
  searchOrg,
  showFAANGOnly,
  showOnlyActive,
  selectedSort,
}: IssuesGridProps) {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem(PAGE_SIZE_KEY);
    if (stored) {
      setPageSize(Number(stored));
    }
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedLanguage,
    searchRepo,
    searchOrg,
    showFAANGOnly,
    showOnlyActive,
    selectedSort,
  ]);

  // Apply filters
  const filteredIssues = issues.filter((issue) => {
    if (
      selectedLanguage &&
      issue.repository.language?.toLowerCase() !==
        selectedLanguage.toLowerCase()
    ) {
      return false;
    }
    if (
      searchRepo &&
      !issue.repository.name.toLowerCase().includes(searchRepo.toLowerCase())
    ) {
      return false;
    }
    if (
      searchOrg &&
      !issue.repository.owner.toLowerCase().includes(searchOrg.toLowerCase())
    ) {
      return false;
    }
    if (showFAANGOnly) {
      const faangOrgs = ["facebook", "amazon", "apple", "netflix", "google"];
      if (!faangOrgs.includes(issue.organization.toLowerCase())) {
        return false;
      }
    }
    if (showOnlyActive && issue.isAssigned) {
      return false;
    }
    return true;
  });

  // Apply sort
  const sortedIssues = filteredIssues.sort((a, b) => {
    if (selectedSort === "stars") {
      return (b.repository.stars ?? 0) - (a.repository.stars ?? 0);
    } else if (selectedSort === "updated") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedIssues.length / pageSize);
  const paginatedIssues = sortedIssues.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedIssues.map((issue, index) => (
          <IssueCard key={index} issue={issue} />
        ))}
      </div>

      {totalPages > 1 && (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={goToPage}
  />
)}

    </div>
  );
}
