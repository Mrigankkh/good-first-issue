import { Issue } from "@/types/issue";

interface RecommendedIssueProps {
  issue: Issue | null;
}

export default function RecommendedIssue({ issue }: RecommendedIssueProps) {
  if (!issue) return null;

  const {
    title,
    url,
    repository,
    createdAt,
    updatedAt,
    labels,
    commentsCount,
    isAssigned,
    organization,
  } = issue;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 mb-8 rounded shadow">
      <div className="flex flex-col gap-2">
        {/* Tag */}
        <div className="inline-block bg-yellow-300 text-yellow-900 text-xs px-2 py-1 rounded-full mb-2 w-fit">
          🔥 Recommended Issue
        </div>

        {/* Issue Title */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold underline hover:text-yellow-700"
        >
          {title}
        </a>

        {/* Repo and Org */}
        <div className="text-sm text-gray-700">
          {organization} / <strong>{repository.name}</strong>
        </div>

        {/* Repo Description */}
        {repository.description && (
          <p className="text-sm text-gray-600 mt-1">{repository.description}</p>
        )}

        {/* Labels */}
        {labels && labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {labels.map((label, idx) => (
              <span
                key={idx}
                className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center text-xs text-gray-600 gap-4 mt-4">
          <div>⭐ {repository.stars ?? 0} stars</div>
          <div>💬 {commentsCount ?? 0} comments</div>
          <div>{isAssigned ? "🚫 Assigned" : "✅ Not Assigned"}</div>
          <div>🛠 {repository.language}</div>
          <div>🕑 Updated {new Date(updatedAt).toLocaleDateString()}</div>
          <div>📢 Visibility: {repository.visibility}</div>
        </div>
      </div>
    </div>
  );
}
