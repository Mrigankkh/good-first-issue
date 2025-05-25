import { Issue } from "@/types/issue";

interface IssueCardProps {
  issue: Issue;
}

const FAANG_ORGS = ["facebook", "amazon", "apple", "netflix", "google"];

export default function IssueCard({ issue }: IssueCardProps) {
  const isFAANG = FAANG_ORGS.includes(issue.organization.toLowerCase());
  const isAssigned = issue.isAssigned;
  const commentsCount = issue.commentsCount;
  const createdDate = new Date(issue.createdAt).toLocaleDateString();

  const issueDescription = (issue as any)?.body || "No description available.";

  return (
    <a
      href={issue.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-lg shadow-sm hover:shadow-md bg-white transition"
    >
      {/* Issue Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-2 text-break">{issue.title}</h2>

      {/* Repo Info */}
      <div className="text-sm text-gray-700 mb-1">
        Owner: <span className="font-semibold">{issue.repository.owner}</span>
      </div>
      <div className="text-sm text-gray-700 mb-1">
        Repo: <span className="font-semibold">{issue.repository.name}</span>
      </div>

      {/* Repo Description */}
      {issue.repository.description && (
        <p className="text-sm text-gray-600 mb-2 italic">
          {issue.repository.description}
        </p>
      )}

      {/* FAANG Badge */}
      <div className="mb-2 h-6">
        {isFAANG ? (
          <div className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {issue.organization.charAt(0).toUpperCase() +
              issue.organization.slice(1)}
          </div>
        ) : (
          <div className="h-6"></div> // Empty space if no FAANG badge
        )}
      </div>

      <div className="border-t border-gray-200 my-3"></div>

      {/* Issue Stats */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
        <div>⭐ {issue.repository.stars} stars</div>
        {issue.repository.language && <div>🖥️ {issue.repository.language}</div>}
      </div>

      {/* Issue Description */}
      <p className="text-xs text-gray-700 mb-3">
        {issueDescription.length > 200
          ? issueDescription.slice(0, 200) + "..."
          : issueDescription}
      </p>

      <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
        <div>🕐 Opened on: {createdDate}</div>
        <div>💬 {commentsCount} comments</div>
      </div>

      {/* Status Badge on its own */}
      <div className="text-xs">
        <span
          className={`inline-block px-2 py-1 rounded-full ${
            isAssigned
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isAssigned ? "Assigned" : "Not Assigned"}
        </span>
      </div>
    </a>
  );
}
