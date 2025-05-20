import { Issue } from "@/types/issue";

const FAANG_ORGS = ["facebook", "amazon", "apple", "netflix", "google"];

export function getRecommendedIssue(issues: Issue[]): Issue | null {
  const faangIssues = issues.filter(issue =>
    FAANG_ORGS.includes(issue.organization.toLowerCase())
  );

  if (faangIssues.length === 0) {
    issues.sort((a, b) =>
      b.repository.stars - a.repository.stars
    )
    
    return issues[0];
  }

  // Sort by latest updated date (descending)
  faangIssues.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return faangIssues[0]; 
}
