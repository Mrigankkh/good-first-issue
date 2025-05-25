from app.models.issue_model import Issue, RepositoryInfo
import datetime

async def fetch_mock_issues() -> list[Issue]:
    issues = []
    now = datetime.datetime.utcnow().isoformat() + "Z"

    for i in range(1, 1000):
        issues.append(Issue(
            title=f"Mock issue #{i}: This is a mock issue. Set env var USE_MOCK_GITHUB_API to false for real issues",
            url=f"https://github.com/mock/repo/issues/{i}",
            createdAt=now,
            updatedAt=now,
            labels=["good first issue", "mock"],
            commentsCount=0,
            isAssigned=False,
            repository=RepositoryInfo(
                name="mock-repo",
                fullName="mock/repo",
                description="Mock repo for testing",
                owner="mock",
                stars=42,
                language="Python",
                topics=["mock", "testing"],
                lastCommit=now,
                visibility="PUBLIC",
            ),
            organization="mock"
        ))

    return issues
